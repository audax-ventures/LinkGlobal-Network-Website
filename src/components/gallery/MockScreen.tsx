interface MockScreenProps {
  variant: 'dashboard' | 'lesson' | 'chat' | 'progress'
}

function DashboardContent() {
  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-brand-cyan/60" />
        <div className="h-2 w-16 rounded-full bg-white/25" />
        <div className="ml-auto h-2 w-8 rounded-full bg-white/15" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-12 rounded-lg bg-white/10" />
        ))}
      </div>
      <div className="flex-1 rounded-lg bg-white/5 p-2">
        <div className="flex h-full items-end gap-1.5">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-brand-cyan/50" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function LessonContent() {
  return (
    <div className="flex h-full flex-col gap-2.5 p-3">
      <div className="h-2 w-24 rounded-full bg-white/25" />
      <div className="h-2 w-32 rounded-full bg-white/15" />
      <div className="mt-2 flex-1 rounded-lg bg-white/5 flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-2 border-brand-cyan/50" />
      </div>
      <div className="h-8 rounded-lg bg-brand-cyan/40" />
    </div>
  )
}

function ChatContent() {
  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="ml-auto h-6 w-2/3 rounded-xl rounded-tr-sm bg-brand-cyan/40" />
      <div className="h-6 w-3/5 rounded-xl rounded-tl-sm bg-white/10" />
      <div className="ml-auto h-6 w-1/2 rounded-xl rounded-tr-sm bg-brand-cyan/40" />
      <div className="h-6 w-2/3 rounded-xl rounded-tl-sm bg-white/10" />
      <div className="mt-auto h-8 rounded-full bg-white/10" />
    </div>
  )
}

function ProgressContent() {
  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="h-2 w-20 rounded-full bg-white/25" />
      {[70, 45, 90].map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-2 flex-1 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-brand-cyan/50" style={{ width: `${v}%` }} />
          </div>
          <span className="text-[9px] text-white/40">{v}%</span>
        </div>
      ))}
      <div className="mt-auto flex justify-center">
        <div className="h-16 w-16 rounded-full border-4 border-brand-cyan/40" />
      </div>
    </div>
  )
}

export default function MockScreen({ variant }: MockScreenProps) {
  const content = {
    dashboard: <DashboardContent />,
    lesson: <LessonContent />,
    chat: <ChatContent />,
    progress: <ProgressContent />,
  }[variant]

  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900/90 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/25" />
      </div>
      <div className="h-[calc(100%-28px)]">{content}</div>
    </div>
  )
}
