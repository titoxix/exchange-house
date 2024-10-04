import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";

interface Props {
  children?: React.ReactNode;
  imagePath?: string;
  title: string;
  body: {
    title: string;
    value: string;
  }[];
}

export default function BalanceCard({
  children,
  imagePath,
  title,
  body,
}: Props) {
  return (
    <Card className="min-w-[300px] max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={imagePath || "/flags/united-states.png"}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex gap-3">
        {body.map((item, index) => {
          return (
            <div key={index} className="flex justify-between">
              <p>{item.title}</p>
              <p>{item.value}</p>
            </div>
          );
        })}
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end">{children}</CardFooter>
    </Card>
  );
}
