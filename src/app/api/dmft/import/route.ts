import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'
import type { RamgarhBlock } from '@/types/dmft'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { rows, dryRun = false } = body

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'rows must be a non-empty array of project records.' },
        { status: 400 }
      )
    }

    const adminUser = dmftDatabase.getUsers()[0]
    const validBlocks: RamgarhBlock[] = ['Mandu', 'Patratu', 'Ramgarh', 'Gola', 'Chitarpur', 'Dulmi']
    const existingProjects = dmftDatabase.getAllProjects()
    const existingIds = new Set(existingProjects.map((p) => p.id.toUpperCase()))
    const existingNames = new Set(existingProjects.map((p) => p.nameEn.toLowerCase().trim()))

    const validatedRows: any[] = []
    const errors: Array<{ rowNumber: number; field: string; message: string }> = []
    let duplicateCount = 0

    rows.forEach((row, index) => {
      const rowNum = index + 1
      const nameEn = (row.nameEn || row.name || '').trim()
      const block = (row.block || 'Mandu').trim()
      const estimatedCost = Number(row.estimatedCost || row.cost || 0)
      const category = (row.category || 'Roads & Bridges').trim()
      const department = (row.department || 'Rural Works Department').trim()

      if (!nameEn || nameEn.length < 3) {
        errors.push({ rowNumber: rowNum, field: 'nameEn', message: 'Project name must be at least 3 characters.' })
        return
      }

      if (!validBlocks.includes(block as RamgarhBlock)) {
        errors.push({ rowNumber: rowNum, field: 'block', message: `Invalid block "${block}". Must be one of: ${validBlocks.join(', ')}` })
        return
      }

      if (isNaN(estimatedCost) || estimatedCost <= 0) {
        errors.push({ rowNumber: rowNum, field: 'estimatedCost', message: 'Estimated cost must be a positive number.' })
        return
      }

      const isDuplicate = existingNames.has(nameEn.toLowerCase())
      if (isDuplicate) {
        duplicateCount++
      }

      validatedRows.push({
        id: row.id || `PRJ-DMFT-RMG-BULK-${Date.now().toString().slice(-4)}-${rowNum}`,
        nameEn,
        nameHi: row.nameHi || nameEn,
        descriptionEn: row.descriptionEn || `Bulk imported scheme for ${block} block.`,
        descriptionHi: row.descriptionHi || '',
        category,
        type: row.type || 'Infrastructure',
        financialYear: row.financialYear || '2024–25',
        department,
        responsibleOfficer: row.responsibleOfficer || 'Executive Engineer',
        block: block as RamgarhBlock,
        panchayat: row.panchayat || 'Central',
        village: row.village || '',
        estimatedCost,
        approvedAmount: Number(row.approvedAmount) || estimatedCost,
        currentStage: 'Stage 1: Work Request & Recommendation',
        status: 'Pending',
        isDuplicate,
      })
    })

    if (errors.length > 0 && !dryRun) {
      return NextResponse.json({
        success: false,
        message: `Validation failed with ${errors.length} errors.`,
        errors,
        validCount: validatedRows.length,
      }, { status: 422 })
    }

    // If dry run, return preview summary
    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        totalSubmitted: rows.length,
        validRecords: validatedRows.length,
        duplicateCount,
        errors,
        preview: validatedRows.slice(0, 5),
      })
    }

    // Commit valid records to DMFT database
    let createdCount = 0
    validatedRows.forEach((r) => {
      if (!existingIds.has(r.id.toUpperCase())) {
        dmftDatabase.createProject(r, adminUser)
        createdCount++
      }
    })

    return NextResponse.json({
      success: true,
      dryRun: false,
      message: `Successfully imported ${createdCount} projects into Ramgarh DMFT database.`,
      importedCount: createdCount,
      duplicateCount,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Import processing failed' },
      { status: 500 }
    )
  }
}

