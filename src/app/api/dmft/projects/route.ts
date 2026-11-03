import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const block = searchParams.get('block') || undefined
    const department = searchParams.get('department') || undefined
    const status = searchParams.get('status') || undefined
    const stage = searchParams.get('stage') || undefined
    const financialYear = searchParams.get('financialYear') || undefined
    const search = searchParams.get('search') || undefined

    const projects = dmftDatabase.filterProjects({
      block,
      department,
      status,
      stage,
      financialYear,
      search,
    })

    const kpis = dmftDatabase.getDashboardKPIs()

    return NextResponse.json({
      success: true,
      count: projects.length,
      kpis,
      projects,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const adminUser = dmftDatabase.getUsers()[0]

    const newProject = dmftDatabase.createProject(body, adminUser)

    return NextResponse.json({
      success: true,
      project: newProject,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create project' },
      { status: 400 }
    )
  }
}

