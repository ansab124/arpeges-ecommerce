import React from "react";

const Presentation = ({ data }) => {
  return (
    <div className="container presentation__container stentorPage h-auto my-3 my-sm-5">
      <div className="theme_heading_jost_h2 text-uppercase mb-3 mb-sm-4 mt-3 mt-sm-0 text-center text-sm-start">
        {data?.title}
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>

      {/* <div className="stentorIntro">
        <p className="text-center text-sm-start">
          Praesent volutpat ut nisl inlit hendrerit. Vestibulum antem ipsum isul
          primis in
        </p>
        <p className="text-center text-sm-start">
          faucibus orci luctus et ultrices posible uere cubilia Curae,il mil
          Etia, porttitor, lacus in luctus mun.
        </p>
      </div> */}
      {/* 
      <h3 className="theme_heading_jost_h3 text-uppercase mb-4">
        {" "}
        sous titre (h3){" "}
      </h3>

      <h4 className="theme_heading_jost_h4 text-uppercase mb-4">
        {" "}
        sous titre (h4){" "}
      </h4>

      <p className="text-center text-sm-start">
        Lorem ipsum dolor sit amet, sonsectetur adipiscing elit. Aenean pulvinar
        vel elit ut varius. Quisque at urna vestibulum, finibus nulla at,
        lobortis purus. Nunc porttitor in mauris in venenatis. In aliquet
        condimentum lectus, Vel molestie libero. Nam quis diam non mi bibendum
        euismod. Nullam fringilla fringilla lorem et tincidunt. Suspendisse
        potenti.
      </p>

      <div className="image_with_text_container col-12 flex-column flex-sm-row row text-center text-sm-start">
        <div className="col-12 col-md-5 col-lg-3 mb-3 mb-sm-0">
          <img src="/assets/productimages/stentor.jpg" alt=" " />
        </div>
        <div className="col-12 col-md-7 col-lg-9">
          <p className="mb-1">
            Lorem ipsum dolor sit amet, sonsectetur adipiscing elit. Aenean
            pulvinar vel elit ut varius. Quisque at urna vestibulum, finibus
            nulla at, lobortis purus. Nunc porttitor in mauris in venenatis. In
            aliquet condimentum lectus, Vel molestie libero. Nam quis diam non
            mi bibendum euismod. Nullam fringilla fringilla lorem et tincidunt.
            Suspendisse potenti. Praesent volutpat ut nisl inlit hendrerit.
          </p>
          <p className="mb-1">Vestibulum antem ipsum isul primis in</p>
          <p>
            faucibus orci luctus et ultrices posible uere cubilia Curaemil mil
            Etiam porttitor, lacus in lactus mun.
          </p>

          <div className="theme_heading_jost_h3 text-uppercase mb-2 mb-sm-3 pt-2 pt-sm-3 text-center text-sm-start">
            sous titre {"(h3)"}
          </div>
          <div className="theme_heading_jost_h4 text-uppercase mb-4 text-center text-sm-start">
            sous titre {"(h4)"}
          </div>
          <p className="mb-1">
            Nunc porttitor in mauris in venenatis. In aliquet condimentum
            lectus, vel molestie libero. Nam quis diam non mi bibendum euismod.
            Nullam fringilla fringilla lorem et tincidunt.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Presentation;
