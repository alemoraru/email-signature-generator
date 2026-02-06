interface EmailClientBadgeProps {
  name: string;
  icon: React.ComponentType;
}

export function EmailClientBadge({ name, icon: Icon }: EmailClientBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-colors">
      <Icon />
      <span className="text-xs sm:text-sm whitespace-nowrap">{name}</span>
    </div>
  );
}
