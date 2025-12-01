import rickshawImg from "figma:asset/eaef97b23ca4f38437b64c779eb398abee1d5ad5.png";

export function RickshawIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <img 
      src={rickshawImg} 
      alt="Rickshaw" 
      className={className}
    />
  );
}