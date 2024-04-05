import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";

interface Props {
  currency: string;
  flag: string;
  buy: string;
  sell: string;
}

export default function PriceCard(props: Props) {
  //const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="w-48">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={`/flags/${props.flag}`}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {props.currency}
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-base text-white">
        <span className="pt-2">{`Compra: ${props.buy}`}</span>
        <span className="pt-2">{`Venta: ${props.sell}`}</span>
      </CardBody>
      <CardFooter className="gap-3"></CardFooter>
    </Card>
  );
}
