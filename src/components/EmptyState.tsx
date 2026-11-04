import Icon from "./Icon";

export default function EmptyState({
  title,
  description,
  icon = "layers"
}: {
  title: string;
  description: string;
  icon?: Parameters<typeof Icon>[0]["name"];
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon"><Icon name={icon} size={25} /></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
