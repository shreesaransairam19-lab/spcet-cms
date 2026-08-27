# Graph Report - spcet-cms  (2026-08-27)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 955 nodes · 2701 edges · 53 communities (49 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `847d36b6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useToast
- button.tsx
- card.tsx
- schema.sql
- index.ts
- dependencies
- scripts
- requireAdmin
- cn
- structure/page.tsx
- utils.ts
- requireAuth
- sidebar.tsx
- compilerOptions
- StudentForm.tsx
- header.tsx
- grade-calculator.ts
- FacultyForm.tsx
- server.ts
- command.tsx
- timetable/page.tsx
- auth-helpers.ts
- use-toast.tsx
- register/page.tsx
- ApiListResponse
- email.ts
- login/page.tsx
- app/layout.tsx
- payment.ts
- student.ts
- import/google-sheets/route.ts
- receipt-generator.ts
- attendance/route.ts
- email/route.ts
- reports/attendance/page.tsx
- radio-group.tsx
- tabs.tsx
- sms.ts
- src/middleware.ts
- exams/route.ts
- reports/fees/page.tsx
- whatsapp.ts
- export.ts
- payslip-generator.ts
- MarkAttendancePage
- EnterMarksPage
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `cn()` - 144 edges
2. `useToast()` - 96 edges
3. `getSupabaseBrowserClient()` - 77 edges
4. `requireAdmin()` - 77 edges
5. `requireAuth()` - 58 edges
6. `Button` - 51 edges
7. `Card` - 48 edges
8. `CardContent` - 48 edges
9. `Badge()` - 43 edges
10. `CardHeader` - 41 edges

## Surprising Connections (you probably didn't know these)
- `DashboardLayout()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/layout.tsx → src/hooks/use-auth.ts
- `loadTimetable()` --calls--> `getSupabaseBrowserClient()`  [EXTRACTED]
  src/app/(dashboard)/timetable/page.tsx → src/lib/supabase/client.ts
- `Tooltip()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/tooltip.tsx → src/lib/utils.ts
- `POST()` --calls--> `requireAdmin()`  [EXTRACTED]
  src/app/api/hostel/allocate/route.ts → src/lib/auth-helpers.ts
- `POST()` --calls--> `requireAdmin()`  [EXTRACTED]
  src/app/api/settings/departments/route.ts → src/lib/auth-helpers.ts

## Import Cycles
- None detected.

## Communities (53 total, 4 thin omitted)

### Community 0 - "useToast"
Cohesion: 0.06
Nodes (45): AttendancePage(), DocumentsPage(), formatFileSize(), ExamsPage(), ResultsPage(), ExamSchedulePage(), FacultyDetailPage(), FeeCollectPage() (+37 more)

### Community 1 - "button.tsx"
Cohesion: 0.14
Nodes (32): DOC_TYPES, ResultWithDetails, EXAM_TYPES, PAYMENT_METHODS, StudentSearchResult, AllocationInfo, BlockInfo, HostelManagementPage() (+24 more)

### Community 2 - "card.tsx"
Cohesion: 0.11
Nodes (32): COLORS, DashboardContent(), DashboardData, ALLOWED_TYPES, DOC_TYPES, DocumentUploadPage(), UploadFile, EXAM_TYPE_COLORS (+24 more)

### Community 3 - "schema.sql"
Cohesion: 0.09
Nodes (48): auth, auth.users, academic_years, admin_staff, attendance_classes, attendance_records, audit_logs, college_settings (+40 more)

### Community 4 - "index.ts"
Cohesion: 0.05
Nodes (49): DELETE(), GET(), POST(), PUT(), ExamScheduleItem, BookFormProps, UserProfile, AcademicYear (+41 more)

### Community 5 - "dependencies"
Cohesion: 0.04
Nodes (49): @capacitor/android, @capacitor/cli, @capacitor/core, class-variance-authority, clsx, date-fns, @hookform/resolvers, lucide-react (+41 more)

### Community 6 - "scripts"
Cohesion: 0.05
Nodes (42): eslint, eslint-config-next, @eslint/eslintrc, allowScripts, @next/swc-win32-x64-msvc, devDependencies, eslint, eslint-config-next (+34 more)

### Community 7 - "requireAdmin"
Cohesion: 0.07
Nodes (33): POST(), DELETE(), GET(), PUT(), DELETE(), PUT(), GET(), DELETE() (+25 more)

### Community 8 - "cn"
Cohesion: 0.10
Nodes (32): ProfilePage(), DataTable(), DataTableProps, Alert, AlertDescription, AlertTitle, alertVariants, DialogDescription() (+24 more)

### Community 9 - "structure/page.tsx"
Cohesion: 0.14
Nodes (27): AttendanceStatusShort, STATUS_CONFIG, STATUS_MAP, FacultyPage(), FEE_TYPES, FeeStructureItem, StudentsPage(), FilterSelect() (+19 more)

### Community 10 - "utils.ts"
Cohesion: 0.06
Nodes (18): loadData(), NotificationsPage(), Label, LabelProps, Switch, SwitchProps, Tooltip(), TooltipProps (+10 more)

### Community 11 - "requireAuth"
Cohesion: 0.09
Nodes (21): AttendanceReportRow, GET(), POST(), GET(), GET(), POST(), GET(), calculateFine() (+13 more)

### Community 12 - "sidebar.tsx"
Cohesion: 0.08
Nodes (25): adminNavGroups, facultyNavGroups, getNavGroups(), NavGroup, NavItem, Sidebar(), SidebarContent(), SidebarProps (+17 more)

### Community 13 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 14 - "StudentForm.tsx"
Cohesion: 0.13
Nodes (17): StudentAttendance, StudentMarkEntry, AttendanceEntry, DocumentEntry, EnrichedStudent, FeePaymentEntry, SemesterResultEntry, StudentDetailPage() (+9 more)

### Community 15 - "header.tsx"
Cohesion: 0.13
Nodes (17): DashboardLayout(), Header(), HeaderProps, ThemeToggle(), DropdownMenu(), DropdownMenuContent, DropdownMenuContentProps, DropdownMenuContext (+9 more)

### Community 16 - "grade-calculator.ts"
Cohesion: 0.15
Nodes (14): GET(), POST(), PUT(), calculateBulkGrades(), calculateCGPA(), calculateGrade(), calculateSGPA(), GPA_BANDS (+6 more)

### Community 17 - "FacultyForm.tsx"
Cohesion: 0.15
Nodes (15): EnrichedFaculty, BLOOD_GROUP_OPTIONS, DESIGNATION_OPTIONS, EMPLOYMENT_TYPE_OPTIONS, FacultyForm(), FacultyFormProps, GENDER_OPTIONS, Tabs (+7 more)

### Community 18 - "server.ts"
Cohesion: 0.23
Nodes (10): POST(), GET(), handleLogout(), POST(), POST(), GET(), DashboardPage(), getDashboardData() (+2 more)

### Community 19 - "command.tsx"
Cohesion: 0.12
Nodes (15): Command(), CommandContext, CommandEmpty(), CommandEmptyProps, CommandGroup(), CommandGroupProps, CommandInput, CommandInputProps (+7 more)

### Community 20 - "timetable/page.tsx"
Cohesion: 0.19
Nodes (13): ClassCard(), DAY_NAMES, formatHourLabel(), formatTime(), hourOf(), HOURS, MiniClassCard(), SUBJECT_STYLES (+5 more)

### Community 21 - "auth-helpers.ts"
Cohesion: 0.38
Nodes (10): GET(), POST(), GET(), POST(), POST(), getServiceClient(), sanitizePage(), sanitizePerPage() (+2 more)

### Community 22 - "use-toast.tsx"
Cohesion: 0.14
Nodes (10): ForgotPasswordForm, ForgotPasswordPage(), forgotPasswordSchema, Employee, MONTHS, SalaryRecord, Toast, ToastContext (+2 more)

### Community 23 - "register/page.tsx"
Cohesion: 0.18
Nodes (9): RegisterForm, RegisterPage(), registerSchema, ResetPasswordForm, ResetPasswordPage(), resetPasswordSchema, CardFooter, PasswordInput (+1 more)

### Community 24 - "ApiListResponse"
Cohesion: 0.15
Nodes (10): DELETE(), GET(), POST(), GET(), POST(), GET(), POST(), ApiListResponse (+2 more)

### Community 25 - "email.ts"
Cohesion: 0.29
Nodes (11): POST(), EmailOptions, EmailResponse, getTransporter(), sendAttendanceAlert(), sendBulkEmail(), sendEmail(), sendPasswordResetEmail() (+3 more)

### Community 26 - "login/page.tsx"
Cohesion: 0.17
Nodes (8): EmailForm, emailSchema, LoginForm(), RollForm, rollSchema, Checkbox, CheckboxProps, TabsList

### Community 27 - "app/layout.tsx"
Cohesion: 0.21
Nodes (8): inter, metadata, viewport, ThemeProvider(), Toast(), Toaster(), toastVariants, ToastProvider()

### Community 28 - "payment.ts"
Cohesion: 0.17
Nodes (6): CreateOrderParams, CreateOrderResult, RefundParams, RefundResult, VerifyPaymentParams, VerifyPaymentResult

### Community 29 - "student.ts"
Cohesion: 0.18
Nodes (10): StudentAcademicInput, studentAcademicSchema, StudentContactInput, studentContactSchema, StudentFormInput, studentFormSchema, StudentParentInput, studentParentSchema (+2 more)

### Community 30 - "import/google-sheets/route.ts"
Cohesion: 0.39
Nodes (6): POST(), parseSheetUrl(), readPublicSheet(), rowsToObjects(), SheetConfig, SheetData

### Community 31 - "receipt-generator.ts"
Cohesion: 0.36
Nodes (7): downloadReceipt(), generateReceiptPDF(), printReceipt(), ReceiptData, FeePayment, FeeReceipt, FeeStructure

### Community 32 - "attendance/route.ts"
Cohesion: 0.32
Nodes (7): GET(), POST(), PUT(), requireFacultyOrAdmin(), ApiBulkResponse, AttendanceClass, AttendanceRecord

### Community 33 - "email/route.ts"
Cohesion: 0.43
Nodes (6): ENV_PATH, GET(), isConfigured(), POST(), readEnvFile(), writeEnvFile()

### Community 34 - "reports/attendance/page.tsx"
Cohesion: 0.33
Nodes (3): AttendanceReportPage(), ReportRow, SubjectReport

### Community 35 - "radio-group.tsx"
Cohesion: 0.33
Nodes (5): RadioGroup, RadioGroupContext, RadioGroupItem, RadioGroupItemProps, RadioGroupProps

### Community 36 - "tabs.tsx"
Cohesion: 0.33
Nodes (5): TabsContentProps, TabsContext, TabsListProps, TabsProps, TabsTriggerProps

### Community 37 - "sms.ts"
Cohesion: 0.47
Nodes (5): sendBulkSms(), sendSms(), sendTemplateSms(), SmsOptions, SmsResponse

### Community 38 - "src/middleware.ts"
Cohesion: 0.47
Nodes (3): updateSession(), config, middleware()

### Community 39 - "exams/route.ts"
Cohesion: 0.40
Nodes (4): GET(), POST(), PUT(), ExamSchedule

### Community 40 - "reports/fees/page.tsx"
Cohesion: 0.33
Nodes (5): DailyCollection, FeeReportsPage(), FeeSummary, StudentDues, exportToCSV()

### Community 41 - "whatsapp.ts"
Cohesion: 0.50
Nodes (4): sendBulkWhatsApp(), sendWhatsApp(), WhatsAppOptions, WhatsAppResponse

### Community 42 - "export.ts"
Cohesion: 0.70
Nodes (4): exportAttendanceReport(), exportFeeReport(), exportStudentReport(), exportToPDF()

### Community 43 - "payslip-generator.ts"
Cohesion: 0.50
Nodes (4): downloadPayslip(), generatePayslip(), MONTH_NAMES, PayslipData

## Knowledge Gaps
- **296 isolated node(s):** `LibraryStats`, `RecentIssue`, `ResultWithDetails`, `StudentSearchResult`, `AllocationInfo` (+291 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `useToast`, `button.tsx`, `card.tsx`, `structure/page.tsx`, `utils.ts`, `sidebar.tsx`, `StudentForm.tsx`, `header.tsx`, `FacultyForm.tsx`, `command.tsx`, `timetable/page.tsx`, `register/page.tsx`, `login/page.tsx`, `app/layout.tsx`, `reports/attendance/page.tsx`, `radio-group.tsx`, `tabs.tsx`, `reports/fees/page.tsx`, `MarkAttendancePage`, `EnterMarksPage`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `requireAdmin()` connect `requireAdmin` to `email/route.ts`, `index.ts`, `exams/route.ts`, `requireAuth`, `grade-calculator.ts`, `auth-helpers.ts`, `ApiListResponse`, `email.ts`, `import/google-sheets/route.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `useToast()` connect `useToast` to `button.tsx`, `card.tsx`, `reports/attendance/page.tsx`, `reports/fees/page.tsx`, `structure/page.tsx`, `utils.ts`, `MarkAttendancePage`, `EnterMarksPage`, `StudentForm.tsx`, `FacultyForm.tsx`, `use-toast.tsx`, `register/page.tsx`, `login/page.tsx`, `app/layout.tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `LibraryStats`, `RecentIssue`, `ResultWithDetails` to the rest of the system?**
  _296 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useToast` be split into smaller, more focused modules?**
  _Cohesion score 0.06292966684294024 - nodes in this community are weakly interconnected._
- **Should `button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1411764705882353 - nodes in this community are weakly interconnected._
- **Should `card.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11373260738052027 - nodes in this community are weakly interconnected._