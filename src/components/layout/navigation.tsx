import type { PageName } from "../../types/page";


const menuItems: { id: PageName; label: string }[] = [
    { id: "home", label: "Ana Sayfa" },
    { id: "events", label: "Etkinlikler" },
    { id: "add", label: "Ekle" },
  ];

  interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}
function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav>
      {menuItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={current === item.id ? "active" : ""}
          aria-current={current === item.id ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.id); // App'teki go fonksiyonunu tetikler
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;