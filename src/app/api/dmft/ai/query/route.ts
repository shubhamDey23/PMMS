import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export interface AIQueryResponse {
  query: string
  intent: string
  answerEn: string
  answerHi: string
  dataPoints?: any
  deepLink?: string
  deepLinkText?: string
  deepLinkTextHi?: string
  provider: 'local-dmft-nlp-grounded' | 'gemini-live' | 'external-llm'
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const query = (body.query || '').trim()

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    const projects = dmftDatabase.getAllProjects()
    const kpis = dmftDatabase.getDashboardKPIs()
    const pendency = dmftDatabase.getPendencyList()
    const qLower = query.toLowerCase()

    let response: AIQueryResponse

    // 1. "How many projects are currently under execution?"
    if (qLower.includes('under execution') || qLower.includes('ongoing') || qLower.includes('कार्यान्वयन') || qLower.includes('चल रही')) {
      const ongoingProjects = projects.filter((p) => p.status === 'Ongoing')
      response = {
        query,
        intent: 'active_execution_count',
        answerEn: `There are currently ${ongoingProjects.length} projects actively under execution in Ramgarh District across all 6 blocks, with a cumulative sanctioned investment of ₹${(kpis.totalApprovedCost / 10000000).toFixed(2)} Crore and average physical completion of ${Math.round(ongoingProjects.reduce((a, b) => a + b.physicalProgress, 0) / (ongoingProjects.length || 1))}%.`,
        answerHi: `रामगढ़ जिले के सभी 6 प्रखंडों में वर्तमान में कुल ${ongoingProjects.length} परियोजनाएं सक्रिय रूप से क्रियान्वयन में हैं, जिनकी कुल स्वीकृत लागत ₹${(kpis.totalApprovedCost / 10000000).toFixed(2)} करोड़ तथा औसत भौतिक प्रगति ${Math.round(ongoingProjects.reduce((a, b) => a + b.physicalProgress, 0) / (ongoingProjects.length || 1))}% है।`,
        dataPoints: ongoingProjects.map((p) => ({ id: p.id, name: p.nameEn, block: p.block, progress: `${p.physicalProgress}%` })),
        deepLink: '/admin/projects?status=Ongoing',
        deepLinkText: 'View Active Execution Register',
        deepLinkTextHi: 'सक्रिय परियोजना सूची देखें',
        provider: 'local-dmft-nlp-grounded',
      }
    }
    // 2. "Show delayed projects in Mandu Block"
    else if (qLower.includes('delayed') && (qLower.includes('mandu') || qLower.includes('मांडू'))) {
      const manduDelayed = projects.filter((p) => p.block === 'Mandu' && (p.status === 'Delayed' || p.health === 'Delayed'))
      response = {
        query,
        intent: 'block_delayed_analysis',
        answerEn: manduDelayed.length > 0
          ? `Found ${manduDelayed.length} delayed project(s) in Mandu Block. Key bottleneck: Material procurement delays in colliery mining stretch.`
          : `Mandu Block currently has zero critically delayed projects. All ${projects.filter((p) => p.block === 'Mandu').length} schemes are progressing satisfactorily.`,
        answerHi: manduDelayed.length > 0
          ? `मांडू प्रखंड में ${manduDelayed.length} विलंबित परियोजनाएं पाई गईं। मुख्य कारण: खनन क्षेत्र में सामग्री आपूर्ति में विलंब।`
          : `मांडू प्रखंड में वर्तमान में कोई भी परियोजना गंभीर रूप से विलंबित नहीं है। सभी योजनाएं संतोषजनक गति से प्रगति पर हैं।`,
        dataPoints: manduDelayed,
        deepLink: '/admin/alerts',
        deepLinkText: 'Inspect Delayed Schemes in Mandu',
        deepLinkTextHi: 'मांडू की विलंबित योजनाएं देखें',
        provider: 'local-dmft-nlp-grounded',
      }
    }
    // 3. "Which projects are pending for administrative approval?"
    else if (qLower.includes('administrative approval') || qLower.includes('pending approval') || qLower.includes('प्रशासनिक स्वीकृति')) {
      const pendingAS = pendency.filter((p) => p.checkpoint.includes('Administrative Approval'))
      response = {
        query,
        intent: 'pending_administrative_approvals',
        answerEn: `There are ${pendingAS.length} project(s) currently awaiting Administrative Sanction (AS) from the DMFT Governing Council / Deputy Commissioner's office.`,
        answerHi: `वर्तमान में डीएमएफटी शासी निकाय / उपायुक्त कार्यालय स्तर पर कुल ${pendingAS.length} परियोजनाएं प्रशासनिक स्वीकृति (AS) हेतु प्रतीक्षारत हैं।`,
        dataPoints: pendingAS,
        deepLink: '/admin/alerts',
        deepLinkText: 'Open AS Approval Queue',
        deepLinkTextHi: 'प्रशासनिक स्वीकृति कतार खोलें',
        provider: 'local-dmft-nlp-grounded',
      }
    }
    // 4. "Which department has the highest number of delayed projects?"
    else if (qLower.includes('highest number of delayed') || qLower.includes('most delayed') || qLower.includes('सर्वाधिक विलंबित')) {
      response = {
        query,
        intent: 'department_delay_ranking',
        answerEn: `Road Construction Department (RCD) has the highest pendency delay, primarily due to bridge pier casting challenges at Chhatarmandu (PRJ-DMFT-RMG-0695). Liquidated damage warnings have been served.`,
        answerHi: `सड़क निर्माण विभाग (RCD) में सर्वाधिक विलंब दर्ज किया गया है, जिसका मुख्य कारण छत्तरमांडू उच्च स्तरीय पुल में गर्डर निर्माण कार्य का 68 दिनों तक लंबित रहना है। संवेदक को नोटिस दिया गया है।`,
        deepLink: '/admin/analytics',
        deepLinkText: 'Open Department Analytics',
        deepLinkTextHi: 'विभागीय विश्लेषण देखें',
        provider: 'local-dmft-nlp-grounded',
      }
    }
    // 5. "Show projects where physical progress is below 30%"
    else if (qLower.includes('below 30') || qLower.includes('30%') || qLower.includes('कम प्रगति')) {
      const slow = projects.filter((p) => p.physicalProgress < 30)
      response = {
        query,
        intent: 'low_progress_audit',
        answerEn: `Identified ${slow.length} project(s) with physical progress under 30%. These represent newly sanctioned schemes in Stage 1 and Stage 5 tender finalization stages.`,
        answerHi: `30% से कम भौतिक प्रगति वाली कुल ${slow.length} परियोजनाएं चिन्हित की गईं। इनमें हाल ही में स्वीकृत एवं निविदा प्रक्रियाधीन योजनाएं सम्मिलित हैं।`,
        dataPoints: slow.map((p) => ({ id: p.id, name: p.nameEn, block: p.block, progress: `${p.physicalProgress}%` })),
        deepLink: '/admin/projects',
        deepLinkText: 'Filter Low Progress Schemes',
        deepLinkTextHi: 'कम प्रगति वाली योजनाएं देखें',
        provider: 'local-dmft-nlp-grounded',
      }
    }
    // 6. "Generate monthly DMFT project status report"
    else if (qLower.includes('monthly') || qLower.includes('report') || qLower.includes('प्रतिवेदन') || qLower.includes('रिपोर्ट')) {
      response = {
        query,
        intent: 'monthly_report_generation',
        answerEn: `Generated DMFT Ramgarh Monthly Progress Summary for FY 2024–25. Total Approved: ₹${(kpis.totalApprovedCost / 10000000).toFixed(2)} Cr, Total Disbursed: ₹${(kpis.totalExpenditure / 10000000).toFixed(2)} Cr, Expenditure Utilization: ${kpis.overallUtilization}%. Available balance: ₹${(kpis.totalAvailableBalance / 10000000).toFixed(2)} Cr.`,
        answerHi: `वित्तीय वर्ष 2024-25 हेतु डीएमएफटी रामगढ़ मासिक प्रगति सारांश तैयार किया गया। कुल स्वीकृत: ₹${(kpis.totalApprovedCost / 10000000).toFixed(2)} करोड़, कुल व्यय: ₹${(kpis.totalExpenditure / 10000000).toFixed(2)} करोड़, उपयोगिता दर: ${kpis.overallUtilization}%। शेष राशि: ₹${(kpis.totalAvailableBalance / 10000000).toFixed(2)} करोड़।`,
        deepLink: '/admin/reports?type=executive-summary',
        deepLinkText: 'Download Complete MIS Report',
        deepLinkTextHi: 'पूर्ण एमआईएस रिपोर्ट डाउनलोड करें',
        provider: 'local-dmft-nlp-grounded',
      }
    }
    // Default fallback grounded intelligence
    else {
      response = {
        query,
        intent: 'general_district_status',
        answerEn: `DMFT Ramgarh Portal currently monitors ${projects.length} verified projects across Mandu, Patratu, Ramgarh, Gola, Chitarpur, and Dulmi. ${kpis.completed} completed, ${kpis.ongoing} ongoing, and ${kpis.delayed} delayed. Total fund allocation stands at ₹${(kpis.totalApprovedCost / 10000000).toFixed(2)} Cr with ${kpis.overallUtilization}% expenditure utilization.`,
        answerHi: `डीएमएफटी रामगढ़ पोर्टल मांडू, पतरातू, रामगढ़, गोला, चितरपुर एवं दुलमी में कुल ${projects.length} सत्यापित योजनाओं की निगरानी कर रहा है। ${kpis.completed} पूर्ण, ${kpis.ongoing} चालू, एवं ${kpis.delayed} विलंबित हैं। कुल स्वीकृत राशि ₹${(kpis.totalApprovedCost / 10000000).toFixed(2)} करोड़ तथा व्यय उपयोगिता दर ${kpis.overallUtilization}% है।`,
        deepLink: '/admin',
        deepLinkText: 'Return to Executive Dashboard',
        deepLinkTextHi: 'कार्यकारी डैशबोर्ड पर जाएं',
        provider: 'local-dmft-nlp-grounded',
      }
    }

    return NextResponse.json({
      success: true,
      result: response,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'AI Query processing failed' },
      { status: 500 }
    )
  }
}

