import React from "react";
import Icon, { HomeOutlined } from "@ant-design/icons";
import { CalqueOne } from "./instrumentSvgs/CalqueOne";
import { CalqueTwo } from "./instrumentSvgs/CalqueTwo";
import { CalqueThree } from "./instrumentSvgs/CalqueThree";
import CalqueFour from "./instrumentSvgs/CalqueFour";
import { CalqueFive } from "./instrumentSvgs/CalqueFive";
import { CalqueSix } from "./instrumentSvgs/CalqueSix";
import { CalqueSeven } from "./instrumentSvgs/CalqueSeven";
import { CalqueEight } from "./instrumentSvgs/CalqueEight";
import { CalqueNine } from "./instrumentSvgs/CalqueNine";
import { CalqueTen } from "./instrumentSvgs/CalqueTen";
import { CalqueEleven } from "./instrumentSvgs/CalqueEleven";
import { CardTextComponent } from "./ExtraContent";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export const AccordeonSection = ({
  customClassProp = "col-12 col-sm-6 col-md-4 col-lg-3 pe-3 pb-3",
  AccordeonSectionMainCLass = "col-12 accordeon_section_container col-xl-10 d-flex flex-wrap mt-3 mt-xl-0",
  routeQuery = "/",
  groups = [],
}) => {
  const router = useRouter();
  const CalqueOneIcon = (props) => <Icon component={CalqueOne} {...props} />;
  const CalqueTwoIcon = (props) => <Icon component={CalqueTwo} {...props} />;
  const CalqueThreeIcon = (props) => (
    <Icon component={CalqueThree} {...props} />
  );
  const CalqueFourIcon = (props) => <Icon component={CalqueFour} {...props} />;

  const CalqueFiveIcon = (props) => <Icon component={CalqueFive} {...props} />;
  const CalqueSixIcon = (props) => <Icon component={CalqueSix} {...props} />;
  const CalqueSevenIcon = (props) => (
    <Icon component={CalqueSeven} {...props} />
  );
  const CalqueEightIcon = (props) => (
    <Icon component={CalqueEight} {...props} />
  );
  const CalqueNineIcon = (props) => <Icon component={CalqueNine} {...props} />;
  const CalqueTenIcon = (props) => <Icon component={CalqueTen} {...props} />;
  const CalqueElevenIcon = (props) => (
    <Icon component={CalqueEleven} {...props} />
  );

  const CardComponent = ({ imgNo, ctxtOne, txtTwo, customClass, slug }) => {
    const route = txtTwo ? txtTwo.replace("/-/g", " ") : "";
    return (
      <div className={customClass}>
        <Link href={routeQuery + slug} passHref>
          <a className="card_container d-flex align-items-center">
            <div className="ms-4 ms-xl-2 me-0 ">{imgNo}</div>
            <CardTextComponent ctxtOne={ctxtOne} txtTwo={txtTwo} />
          </a>
        </Link>
      </div>
    );
  };
  return (
    <div className={AccordeonSectionMainCLass}>
      {groups &&
        groups.length > 0 &&
        groups?.map((group, index) => {
          return (
            <CardComponent
              key={group?.name + index}
              customClass={customClassProp}
              imgNo={
                <Image
                  loading="eager"
                  alt={group?.name}
                  src={group?.icon_path}
                  width={60}
                  height={60}
                />
              }
              ctxtOne={group?.name.split("/")[0]}
              txtTwo={group?.name.split("/")[1]}
              slug={group?.slug}
            />
          );
        })}
    </div>
  );
};
