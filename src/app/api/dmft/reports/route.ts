import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const reportType = searchParams.get('type') || 'executive-summary'
    const block = searchParams.get('block') || 'All'
    const department = searchParams.get('department') || 'All'
    const fy = searchParams.get('fy') || 'All'

    let projects = dmftDatabase.getAllProjects()

    if (block !== 'All') projects = projects.filter((p) => p.block === block)
    if (department !== 'All') projects = projects.filter((p) => p.department === department)
    if (fy !== 'All') projects = projects.filter((p) => p.financialYear === fy)

    const nowStr = new Date().toISOString()
    const kpis = dmftDatabase.getDashboardKPIs()

    let reportData: any = {}

    switch (reportType) {
      case 'project-status':
        reportData = {
          title: 'Project Status Report',
          titleHi: 'परियोजना स्थिति प्रतिवेदन',
          summary: {
            total: projects.length,
            completed: projects.filter((p) => p.status === 'Completed').length,
            ongoing: projects.filter((p) => p.status === 'Ongoing').length,
            pending: projects.filter((p) => p.status === 'Pending').length,
            delayed: projects.filter((p) => p.status === 'Delayed').length,
          },
          rows: projects.map((p) => ({
            id: p.id,
            name: p.nameEn,
            block: p.block,
            status: p.status,
            stage: p.currentStage,
            cost: p.approvedAmount || p.estimatedCost,
            physicalProgress: `${p.physicalProgress}%`,
          })),
        }
        break

      case 'block-wise':
        const blockCounts: Record<string, { total: number; completed: number; ongoing: number; expenditure: number }> = {}
        const blocksList = ['Mandu', 'Patratu', 'Ramgarh', 'Gola', 'Chitarpur', 'Dulmi']
        blocksList.forEach((b) => {
          blockCounts[b] = { total: 0, completed: 0, ongoing: 0, expenditure: 0 }
        })
        projects.forEach((p) => {
          if (!blockCounts[p.block]) blockCounts[p.block] = { total: 0, completed: 0, ongoing: 0, expenditure: 0 }
          blockCounts[p.block].total++
          if (p.status === 'Completed') blockCounts[p.block].completed++
          if (p.status === 'Ongoing') blockCounts[p.block].ongoing++
          blockCounts[p.block].expenditure += p.expenditure || 0
        })
        reportData = {
          title: 'Block-wise Project Distribution Report',
          titleHi: 'प्रखंड-वार परियोजना वितरण प्रतिवेदन',
          blockCounts,
          rows: Object.entries(blockCounts).map(([bName, val]) => ({
            block: bName,
            totalProjects: val.total,
            completed: val.completed,
            ongoing: val.ongoing,
            expenditureCr: (val.expenditure / 10000000).toFixed(2),
          })),
        }
        break

      case 'delayed-projects':
        const delayedList = projects.filter((p) => p.status === 'Delayed' || p.health === 'Delayed')
        reportData = {
          title: 'Critical Delayed Projects Report',
          titleHi: 'अति-गंभीर विलंबित परियोजना प्रतिवेदन',
          count: delayedList.length,
          rows: delayedList.map((p) => ({
            id: p.id,
            name: p.nameEn,
            block: p.block,
            department: p.department,
            responsibleOfficer: p.responsibleOfficer,
            contractor: p.contractorName,
            daysOverdue: 68,
            currentProgress: `${p.physicalProgress}%`,
          })),
        }
        break

      case 'pending-approvals':
        const pendingList = dmftDatabase.getPendencyList()
        reportData = {
          title: 'Pending Approvals & Clearances Report',
          titleHi: 'लंबित स्वीकृतियां एवं अनापत्ति प्रतिवेदन',
          count: pendingList.length,
          rows: pendingList,
        }
        break

      case 'financial-progress':
        reportData = {
          title: 'Financial Progress & UC Utilization Report',
          titleHi: 'वित्तीय प्रगति एवं उपयोगिता प्रमाण पत्र प्रतिवेदन',
          totalApproved: kpis.totalApprovedCost,
          totalExpenditure: kpis.totalExpenditure,
          balance: kpis.totalAvailableBalance,
          utilization: `${kpis.overallUtilization}%`,
          rows: projects.map((p) => ({
            id: p.id,
            name: p.nameEn,
            sanctionedAmount: p.approvedAmount,
            amountReleased: p.amountReleased,
            expenditure: p.expenditure,
            ucStatus: p.ucStatus,
            ucSubmissionDate: p.ucSubmissionDate || 'Pending',
          })),
        }
        break

      case 'inspection-report':
        const allInspections: any[] = []
        projects.forEach((p) => {
          p.inspections.forEach((insp) => {
            allInspections.push({
              projectId: p.id,
              projectName: p.nameEn,
              block: p.block,
              inspectionDate: insp.inspectionDate,
              inspectionTeam: insp.inspectionTeam.join(', '),
              findings: insp.findings,
              deficiencies: insp.deficiencies,
              complianceStatus: insp.complianceStatus,
            })
          })
        })
        reportData = {
          title: 'Field Quality Inspection & Vigilance Report',
          titleHi: 'क्षेत्रीय गुणवत्ता निरीक्षण एवं सतर्कता प्रतिवेदन',
          totalInspections: allInspections.length,
          rows: allInspections,
        }
        break

      default:
        // Executive Summary
        reportData = {
          title: 'Executive DMFT District Monitoring Summary',
          titleHi: 'कार्यकारी डीएमएफटी जिला निगरानी सारांश',
          district: 'Ramgarh, Jharkhand',
          generatedAt: nowStr,
          kpis,
          totalProjects: projects.length,
          recentUpdates: projects.slice(0, 5).map((p) => ({
            id: p.id,
            name: p.nameEn,
            block: p.block,
            stage: p.currentStage,
            status: p.status,
            progress: `${p.physicalProgress}%`,
          })),
        }
        break
    }

    return NextResponse.json({
      success: true,
      reportType,
      generatedAt: nowStr,
      filters: { block, department, fy },
      data: reportData,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Report generation failed' },
      { status: 500 }
    )
  }
}

