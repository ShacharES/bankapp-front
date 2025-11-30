export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}