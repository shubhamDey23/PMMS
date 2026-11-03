'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik'
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  Crosshair,
  FileCheck2,
  FilePlus2,
  FileText,
  FolderKanban,
  HelpCircle,
  IndianRupee,
  Layers,
  Loader2,
  MapPin,
  Save,
  Trash2,
  Upload,
} from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'
import { createProjectSchema } from '@/lib/validation/project.schema'
import { formikZodAdapter } from '@/lib/validation/formik-zod-adapter'
import { projectService, type CreateProjectInput } from '@/lib/services/project.service'

interface DocumentItem {
  name: string
  type: string
  size: string
}

export function ProjectForm({
  onSuccess,
}: {
  onSuccess?: (projectId: string) => void
}) {
  const router = useRouter()
  const { t, language } = useTranslation()

  const [attachedDocs, setAttachedDocs] = useState<DocumentItem[]>([])
  const [docName, setDocName] = useState('')
  const [docType, setDocType] = useState('Sanction Order')
  const [docSize, setDocSize] = useState('1.5 MB')

  const [geoDetecting, setGeoDetecting] = useState(false)
  const [geoStatusMsg, setGeoStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null)

  const schema = createProjectSchema(language)
  const validateWithZod = formikZodAdapter(schema)

  const initialValues: CreateProjectInput = {
    nameEn: '',
    nameHi: '',
    descriptionEn: '',
    descriptionHi: '',
    category: 'Roads & Bridges',
    type: 'Infrastructure',
    financialYear: '2024–25',
    department: 'Rural Works',
    responsibleOfficer: '',
    contractor: '',

    state: 'Jharkhand',
    district: 'Ramgarh',
    block: 'Mandu',
    panchayat: '',
    village: '',
    address: '',
    latitude: undefined,
    longitude: undefined,

    estimatedCost: '' as unknown as number,
    approvedAmount: '' as unknown as number,
    agreementAmount: '' as unknown as number,
    amountReleased: '' as unknown as number,
    expenditure: '' as unknown as number,

    approvalDate: '',
    plannedStartDate: '',
    plannedCompletionDate: '',
    actualStartDate: '',
    actualCompletionDate: '',

    physicalProgress: 0,
    financialProgress: 0,
    stage: 'Recommendation',
    status: 'Pending',
    priority: 'Medium',
    remarks: '',
  }

  const handleAddDocument = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!docName.trim()) return
    setAttachedDocs((prev) => [
      ...prev,
      {
        name: docName.trim(),
        type: docType,
        size: docSize,
      },
    ])
    setDocName('')
  }

  const handleRemoveDoc = (idx: number) => {
    setAttachedDocs((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleDetectGPS = (setFieldValue: (field: string, value: unknown) => void) => {
    if (!navigator.geolocation) {
      setGeoStatusMsg({
        type: 'error',
        text: language === 'hi' ? 'जियोलोकेशन असमर्थित है।' : 'Geolocation unsupported by browser.',
      })
      return
    }

    setGeoDetecting(true)
    setGeoStatusMsg(null)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoDetecting(false)
        const lat = Math.round(pos.coords.latitude * 10000) / 10000
        const lng = Math.round(pos.coords.longitude * 10000) / 10000
        setFieldValue('latitude', lat)
        setFieldValue('longitude', lng)
        setGeoStatusMsg({
          type: 'success',
          text: `${t.form.locationDetected} (${lat}° N, ${lng}° E)`,
        })
      },
      () => {
        setGeoDetecting(false)
        setGeoStatusMsg({
          type: 'error',
          text: t.form.locationDenied,
        })
      },
      { timeout: 8000 }
    )
  }

  const handleSubmitForm = async (
    values: CreateProjectInput,
    { setSubmitting, resetForm }: FormikHelpers<CreateProjectInput>
  ) => {
    try {
      const payload: CreateProjectInput = {
        ...values,
        documents: attachedDocs,
      }

      const created = projectService.createProject(payload)
      setSubmitSuccessMsg(
        language === 'hi'
          ? `परियोजना सफलतापूर्वक स्वीकृत कर दी गई! पहचान आईडी: ${created.id}`
          : `Project sanctioned and registered successfully! Project ID: ${created.id}`
      )

      resetForm()
      setAttachedDocs([])

      if (onSuccess) {
        onSuccess(created.id)
      } else {
        setTimeout(() => {
          router.push('/admin/projects')
        }, 1500)
      }
    } catch (err) {
      console.error('Error creating project:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="project-form-container">
      {/* Header & Breadcrumb */}
      <div className="form-page-header">
        <Link href="/admin/projects" className="form-back-link">
          <ArrowLeft size={16} />
          <span>{t.form.returnToProjects}</span>
        </Link>
        <h2>{t.form.newProjectTitle}</h2>
        <p>{t.form.newProjectSubtitle}</p>
      </div>

      {submitSuccessMsg && (
        <div className="form-success-banner" role="alert">
          <CheckCircle2 size={20} />
          <div>
            <strong>{t.common.success}</strong>
            <p>{submitSuccessMsg}</p>
          </div>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validate={validateWithZod}
        onSubmit={handleSubmitForm}
      >
        {({ isSubmitting, setFieldValue, values, errors, touched, resetForm }) => (
          <Form className="project-form card" noValidate>
            {/* ======================================================== */}
            {/* SECTION 1: Basic Information */}
            {/* ======================================================== */}
            <div className="form-section">
              <div className="form-section-head">
                <span className="section-badge"><FolderKanban size={16} /></span>
                <div>
                  <h3>{t.form.secBasic}</h3>
                  <p>{t.form.secBasicDesc}</p>
                </div>
              </div>

              <div className="form-grid two-col">
                <div className={`form-field ${errors.nameEn && touched.nameEn ? 'has-error' : ''}`}>
                  <label htmlFor="nameEn">
                    {t.form.nameEn} <span className="req">*</span>
                  </label>
                  <Field
                    id="nameEn"
                    name="nameEn"
                    type="text"
                    placeholder={t.form.nameEnPlaceholder}
                  />
                  <ErrorMessage name="nameEn" component="span" className="error-text" />
                </div>

                <div className="form-field">
                  <label htmlFor="nameHi">{t.form.nameHi}</label>
                  <Field
                    id="nameHi"
                    name="nameHi"
                    type="text"
                    placeholder={t.form.nameHiPlaceholder}
                  />
                </div>
              </div>

              <div className="form-grid two-col">
                <div className={`form-field ${errors.descriptionEn && touched.descriptionEn ? 'has-error' : ''}`}>
                  <label htmlFor="descriptionEn">
                    {t.form.descEn} <span className="req">*</span>
                  </label>
                  <Field
                    as="textarea"
                    rows={3}
                    id="descriptionEn"
                    name="descriptionEn"
                    placeholder={t.form.descEnPlaceholder}
                  />
                  <ErrorMessage name="descriptionEn" component="span" className="error-text" />
                </div>

                <div className="form-field">
                  <label htmlFor="descriptionHi">{t.form.descHi}</label>
                  <Field
                    as="textarea"
                    rows={3}
                    id="descriptionHi"
                    name="descriptionHi"
                    placeholder={t.form.descHiPlaceholder}
                  />
                </div>
              </div>

              <div className="form-grid three-col">
                <div className={`form-field ${errors.category && touched.category ? 'has-error' : ''}`}>
                  <label htmlFor="category">
                    {t.form.category} <span className="req">*</span>
                  </label>
                  <Field as="select" id="category" name="category">
                    <option value="Roads & Bridges">Roads &amp; Bridges / सड़क एवं पुल</option>
                    <option value="Drinking Water & Sanitation">Drinking Water / पेयजल एवं स्वच्छता</option>
                    <option value="Education & Sports">Education &amp; Sports / शिक्षा एवं खेल</option>
                    <option value="Health & Family Welfare">Health / स्वास्थ्य एवं परिवार कल्याण</option>
                    <option value="Water Resources & Irrigation">Water Resources / जल संसाधन एवं सिंचाई</option>
                    <option value="Renewable Energy">Renewable Energy / नवीन ऊर्जा</option>
                    <option value="Social Welfare & Women Welfare">Social Welfare / सामाजिक कल्याण</option>
                  </Field>
                  <ErrorMessage name="category" component="span" className="error-text" />
                </div>

                <div className="form-field">
                  <label htmlFor="financialYear">
                    {t.form.fy} <span className="req">*</span>
                  </label>
                  <Field as="select" id="financialYear" name="financialYear">
                    <option value="2025–26">FY 2025–26</option>
                    <option value="2024–25">FY 2024–25</option>
                    <option value="2023–24">FY 2023–24</option>
                  </Field>
                </div>

                <div className={`form-field ${errors.department && touched.department ? 'has-error' : ''}`}>
                  <label htmlFor="department">
                    {t.form.department} <span className="req">*</span>
                  </label>
                  <Field as="select" id="department" name="department">
                    <option value="Rural Works">Rural Works Department (RWD)</option>
                    <option value="Public Health">Public Health Engineering / DWSD</option>
                    <option value="Education">School Education &amp; Literacy</option>
                    <option value="Health & Family">Health, Medical Education &amp; FW</option>
                    <option value="Water Resources">Water Resources Department</option>
                    <option value="Renewable Energy">Renewable Energy Development Agency</option>
                    <option value="Building Construction">Building Construction Department</option>
                  </Field>
                  <ErrorMessage name="department" component="span" className="error-text" />
                </div>
              </div>

              <div className="form-grid two-col">
                <div className="form-field">
                  <label htmlFor="responsibleOfficer">{t.form.officer}</label>
                  <Field
                    id="responsibleOfficer"
                    name="responsibleOfficer"
                    type="text"
                    placeholder={t.form.officerPlaceholder}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contractor">Contractor / Executing Agency</label>
                  <Field
                    id="contractor"
                    name="contractor"
                    type="text"
                    placeholder="e.g., M/s Maa Infra Projects"
                  />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 2: Geographic Details & Geolocation */}
            {/* ======================================================== */}
            <div className="form-section">
              <div className="form-section-head">
                <span className="section-badge"><MapPin size={16} /></span>
                <div>
                  <h3>{t.form.secGeo}</h3>
                  <p>{t.form.secGeoDesc}</p>
                </div>
              </div>

              <div className="form-grid four-col">
                <div className="form-field">
                  <label htmlFor="state">{t.form.state}</label>
                  <Field id="state" name="state" type="text" />
                </div>
                <div className={`form-field ${errors.district && touched.district ? 'has-error' : ''}`}>
                  <label htmlFor="district">
                    {t.form.district} <span className="req">*</span>
                  </label>
                  <Field id="district" name="district" type="text" />
                  <ErrorMessage name="district" component="span" className="error-text" />
                </div>
                <div className="form-field">
                  <label htmlFor="block">{t.form.block}</label>
                  <Field as="select" id="block" name="block">
                    <option value="Mandu">Mandu / मांडू</option>
                    <option value="Patratu">Patratu / पतरातू</option>
                    <option value="Ramgarh">Ramgarh / रामगढ़</option>
                    <option value="Gola">Gola / गोला</option>
                    <option value="Chitarpur">Chitarpur / चितरपुर</option>
                    <option value="Dulmi">Dulmi / दुलमी</option>
                  </Field>
                </div>
                <div className="form-field">
                  <label htmlFor="panchayat">{t.form.panchayat}</label>
                  <Field id="panchayat" name="panchayat" type="text" placeholder="e.g. Rampur" />
                </div>
              </div>

              <div className="form-grid two-col">
                <div className="form-field">
                  <label htmlFor="village">{t.form.village}</label>
                  <Field id="village" name="village" type="text" placeholder="e.g. Lakshmipur" />
                </div>
                <div className="form-field">
                  <label htmlFor="address">{t.form.address}</label>
                  <Field id="address" name="address" type="text" placeholder={t.form.addressPlaceholder} />
                </div>
              </div>

              {/* Coordinates & Geolocation Detection */}
              <div className="form-geo-box">
                <div className="geo-box-header">
                  <div>
                    <strong>GPS Latitude &amp; Longitude Coordinates</strong>
                    <small>Optional: Enter field coordinates or detect automatically using device GPS.</small>
                  </div>
                  <button
                    type="button"
                    className="detect-gps-btn"
                    onClick={() => handleDetectGPS(setFieldValue)}
                    disabled={geoDetecting}
                  >
                    <Crosshair size={14} className={geoDetecting ? 'spinner-icon' : ''} />
                    <span>{geoDetecting ? t.form.detectingLocation : t.form.detectLocation}</span>
                  </button>
                </div>

                {geoStatusMsg && (
                  <div className={`geo-status-msg ${geoStatusMsg.type}`}>
                    <span>{geoStatusMsg.text}</span>
                  </div>
                )}

                <div className="form-grid two-col" style={{ marginTop: '8px' }}>
                  <div className={`form-field ${errors.latitude && touched.latitude ? 'has-error' : ''}`}>
                    <label htmlFor="latitude">{t.form.latitude}</label>
                    <Field
                      id="latitude"
                      name="latitude"
                      type="number"
                      step="0.0001"
                      placeholder={t.form.latitudePlaceholder}
                    />
                    <ErrorMessage name="latitude" component="span" className="error-text" />
                  </div>
                  <div className={`form-field ${errors.longitude && touched.longitude ? 'has-error' : ''}`}>
                    <label htmlFor="longitude">{t.form.longitude}</label>
                    <Field
                      id="longitude"
                      name="longitude"
                      type="number"
                      step="0.0001"
                      placeholder={t.form.longitudePlaceholder}
                    />
                    <ErrorMessage name="longitude" component="span" className="error-text" />
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 3: Financial Sanctions */}
            {/* ======================================================== */}
            <div className="form-section">
              <div className="form-section-head">
                <span className="section-badge"><IndianRupee size={16} /></span>
                <div>
                  <h3>{t.form.secFinance}</h3>
                  <p>{t.form.secFinanceDesc}</p>
                </div>
              </div>

              <div className="form-grid three-col">
                <div className={`form-field ${errors.estimatedCost && touched.estimatedCost ? 'has-error' : ''}`}>
                  <label htmlFor="estimatedCost">
                    {t.form.estimatedCost} <span className="req">*</span>
                  </label>
                  <Field
                    id="estimatedCost"
                    name="estimatedCost"
                    type="number"
                    min="0"
                    placeholder="e.g. 25000000"
                  />
                  <ErrorMessage name="estimatedCost" component="span" className="error-text" />
                </div>

                <div className={`form-field ${errors.approvedAmount && touched.approvedAmount ? 'has-error' : ''}`}>
                  <label htmlFor="approvedAmount">{t.form.approvedAmount}</label>
                  <Field
                    id="approvedAmount"
                    name="approvedAmount"
                    type="number"
                    min="0"
                    placeholder="e.g. 24800000"
                  />
                  <ErrorMessage name="approvedAmount" component="span" className="error-text" />
                </div>

                <div className={`form-field ${errors.agreementAmount && touched.agreementAmount ? 'has-error' : ''}`}>
                  <label htmlFor="agreementAmount">{t.form.agreementAmount}</label>
                  <Field
                    id="agreementAmount"
                    name="agreementAmount"
                    type="number"
                    min="0"
                    placeholder="e.g. 24200000"
                  />
                  <ErrorMessage name="agreementAmount" component="span" className="error-text" />
                </div>
              </div>

              <div className="form-grid two-col">
                <div className="form-field">
                  <label htmlFor="amountReleased">{t.form.amountReleased}</label>
                  <Field
                    id="amountReleased"
                    name="amountReleased"
                    type="number"
                    min="0"
                    placeholder="e.g. 10000000"
                  />
                </div>

                <div className={`form-field ${errors.expenditure && touched.expenditure ? 'has-error' : ''}`}>
                  <label htmlFor="expenditure">{t.form.expenditure}</label>
                  <Field
                    id="expenditure"
                    name="expenditure"
                    type="number"
                    min="0"
                    placeholder="e.g. 5000000"
                  />
                  <ErrorMessage name="expenditure" component="span" className="error-text" />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 4: Timeline & Schedule */}
            {/* ======================================================== */}
            <div className="form-section">
              <div className="form-section-head">
                <span className="section-badge"><Calendar size={16} /></span>
                <div>
                  <h3>{t.form.secTimeline}</h3>
                  <p>{t.form.secTimelineDesc}</p>
                </div>
              </div>

              <div className="form-grid three-col">
                <div className="form-field">
                  <label htmlFor="approvalDate">{t.form.approvalDate}</label>
                  <Field id="approvalDate" name="approvalDate" type="date" />
                </div>
                <div className="form-field">
                  <label htmlFor="plannedStartDate">{t.form.plannedStartDate}</label>
                  <Field id="plannedStartDate" name="plannedStartDate" type="date" />
                </div>
                <div className={`form-field ${errors.plannedCompletionDate ? 'has-error' : ''}`}>
                  <label htmlFor="plannedCompletionDate">{t.form.plannedCompletionDate}</label>
                  <Field id="plannedCompletionDate" name="plannedCompletionDate" type="date" />
                  <ErrorMessage name="plannedCompletionDate" component="span" className="error-text" />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 5: Progress & Status */}
            {/* ======================================================== */}
            <div className="form-section">
              <div className="form-section-head">
                <span className="section-badge"><FileCheck2 size={16} /></span>
                <div>
                  <h3>{t.form.secProgress}</h3>
                  <p>{t.form.secProgressDesc}</p>
                </div>
              </div>

              <div className="form-grid four-col">
                <div className="form-field">
                  <label htmlFor="status">{t.form.status}</label>
                  <Field as="select" id="status" name="status">
                    <option value="Pending">Pending / लंबित</option>
                    <option value="Ongoing">Ongoing / चालू</option>
                    <option value="Completed">Completed / पूर्ण</option>
                    <option value="Delayed">Delayed / विलंबित</option>
                  </Field>
                </div>
                <div className="form-field">
                  <label htmlFor="stage">{t.form.stage}</label>
                  <Field as="select" id="stage" name="stage">
                    <option value="Recommendation">Stage 1: Work Request &amp; Recommendation / अनुशंसा</option>
                    <option value="Acceptance">Stage 2: Work Acceptance / स्वीकृति</option>
                    <option value="Technical approval">Stage 3: Technical Approval (TS) / तकनीकी स्वीकृति</option>
                    <option value="Administrative approval">Stage 4: Administrative Approval (AS) / प्रशासनिक स्वीकृति</option>
                    <option value="Tender">Stage 5: Work Execution &amp; Tender / निविदा</option>
                    <option value="Under execution">Stage 6: Physical Progress &amp; Measurement / भौतिक प्रगति</option>
                    <option value="Payment requisition">Stage 7: Payment Requisition / भुगतान अधियाचन</option>
                    <option value="Inspection">Stage 8: Site Inspection &amp; Audit / स्थलीय निरीक्षण</option>
                    <option value="Financial progress">Stage 9: Financial Progress &amp; Release / वित्तीय प्रगति</option>
                    <option value="Completed">Stage 10: Handover &amp; Commissioning / हैंडओवर एवं लोकार्पण</option>
                  </Field>
                </div>
                <div className="form-field">
                  <label htmlFor="priority">{t.form.priority}</label>
                  <Field as="select" id="priority" name="priority">
                    <option value="High">High / उच्च</option>
                    <option value="Critical">Critical / अति-गंभीर</option>
                    <option value="Medium">Medium / मध्यम</option>
                    <option value="Low">Low / निम्न</option>
                  </Field>
                </div>
                <div className="form-field">
                  <label htmlFor="physicalProgress">{t.form.physicalProgress}</label>
                  <Field id="physicalProgress" name="physicalProgress" type="number" min="0" max="100" />
                </div>
              </div>

              <div className="form-field" style={{ marginTop: '12px' }}>
                <label htmlFor="remarks">{t.form.remarks}</label>
                <Field
                  as="textarea"
                  rows={2}
                  id="remarks"
                  name="remarks"
                  placeholder={t.form.remarksPlaceholder}
                />
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 6: Supporting Documents Upload */}
            {/* ======================================================== */}
            <div className="form-section">
              <div className="form-section-head">
                <span className="section-badge"><Upload size={16} /></span>
                <div>
                  <h3>{t.form.secDocs}</h3>
                  <p>{t.form.secDocsDesc}</p>
                </div>
              </div>

              <div className="form-doc-box">
                <div className="doc-attach-row">
                  <div className="form-field" style={{ flex: 2 }}>
                    <label>{t.form.docTitle}</label>
                    <input
                      type="text"
                      placeholder="e.g., Administrative Approval Letter.pdf"
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                    />
                  </div>
                  <div className="form-field" style={{ flex: 1 }}>
                    <label>Document Category</label>
                    <select value={docType} onChange={(e) => setDocType(e.target.value)}>
                      <option value="Sanction Order">Administrative Sanction</option>
                      <option value="DPR">Detailed Project Report (DPR)</option>
                      <option value="Technical Approval">Technical Sanction</option>
                      <option value="Inspection Report">Inspection Report</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="secondary-btn attach-btn"
                    onClick={handleAddDocument}
                    style={{ alignSelf: 'flex-end', height: '38px' }}
                  >
                    <FilePlus2 size={16} />
                    <span>{t.form.docUploadBtn}</span>
                  </button>
                </div>

                {attachedDocs.length > 0 ? (
                  <div className="attached-docs-list">
                    <strong>{t.form.docUploadedList} ({attachedDocs.length}):</strong>
                    {attachedDocs.map((doc, idx) => (
                      <div key={idx} className="doc-item">
                        <FileText size={16} className="text-green" />
                        <span className="doc-item-name">{doc.name}</span>
                        <span className="doc-item-type">[{doc.type}]</span>
                        <button
                          type="button"
                          className="doc-delete-btn"
                          onClick={() => handleRemoveDoc(idx)}
                          aria-label="Remove document"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-docs-hint">{t.form.noDocsAttached}</p>
                )}

                <small className="doc-disclaimer">{t.form.docSimulatedNotice}</small>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="form-actions-bar">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => resetForm()}
                disabled={isSubmitting}
              >
                {t.form.resetForm}
              </button>

              <button
                type="submit"
                className="primary-btn submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner-icon" />
                    <span>{t.form.saving}</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>{t.form.saveProject}</span>
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

