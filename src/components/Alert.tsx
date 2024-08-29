interface Props {
  message: string;
  messageSecondLine?: string;
  severity: "error" | "success" | "warning" | "info";
}

export default function Alert({ message, messageSecondLine, severity }: Props) {
  const color = {
    error: "bg-rose-700",
    success: "bg-green-700",
    warning: "bg-yellow-700",
    info: "bg-sky-700",
  }[severity];

  return (
    <div
      className={`relative block w-full p-4 mb-4 text-base leading-5 text-white ${color} rounded-lg opacity-100 font-regular`}
    >
      <p>{message}</p>
      <p>{messageSecondLine}</p>
    </div>
  );
}
