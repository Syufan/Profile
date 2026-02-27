interface TechBadgeProps {
    tech: string;
  }

export default function TechBadge({ tech }: TechBadgeProps) {
    return (
      <span className="text-teal-300 text-xs border border-teal-300/20 bg-teal-300/10 px-3 py-1 rounded-full">
        {tech}
      </span>
    );
  }
