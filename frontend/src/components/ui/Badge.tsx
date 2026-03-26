// frontend/src/components/ui/Badge.tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'default';
}

export const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  const styles = {
    success: 'bg-green-100 text-green-700',
    danger: 'bg-red-100 text-red-700',
    default: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};