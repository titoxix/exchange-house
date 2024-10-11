import React from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";

interface Props {
  currency: string;
  flag: string;
  buy: string;
  sell: string;
}

export default function PriceCard(props: Props) {
  //const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card id="test" className="flex justify-center w-[344px] h-20">
      <CardHeader>
        <div className="flex gap-5 items-center">
          <Image
            alt="country-flag"
            height={36}
            width={36}
            radius="sm"
            src={`/flags/${props.flag}`}
          />
          <div className="flex flex-col gap-1 items-start justify-center w-12">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {props.currency}
            </h4>
          </div>
          <div className="flex gap-6 ml-10">
            <div className="flex flex-col justify-center items-center">
              <span className="pt-2">{`Compra`}</span>
              <span className="pt-2">{`${props.buy}`}</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="pt-2">{`Venta`}</span>
              <span className="pt-2">{`${props.buy}`}</span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
