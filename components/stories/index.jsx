import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { GrFormClose } from "react-icons/gr"
import { MdArrowBack, MdArrowForward, MdOutlineClose } from "react-icons/md"
import { FaBackward, FaForward, FaShareAlt } from "react-icons/fa";
import { HiVolumeOff } from "react-icons/hi"
const images = [
    "/assets/carousalImages/carousalImg1.jpg",
    "/assets/carousalImages/carousalImg2.jpg",
    "/assets/carousalImages/carousalImg3.jpg",
    "/assets/carousalImages/carousalImg4.jpg",
];

const SLIDER_CONTENT = [
    {
        images: [
            "/assets/carousalImages/carousalImg1.jpg",
            "/assets/carousalImages/carousalImg2.jpg",
            "/assets/carousalImages/carousalImg3.jpg",
            "/assets/carousalImages/carousalImg4.jpg",
        ]
    },
    {
        images: [
            "/assets/test/1.jpg",
            "/assets/test/2.jpg",
            "/assets/test/3.jpg",
            "/assets/test/4.jpg",


        ]
    },
    {
        images: [
            "/assets/test/5.jpg",
            "/assets/test/6.jpg",
            "/assets/test/7.jpg",
            "/assets/test/11.jpg",

        ]
    },
    {
        images: [
            "/assets/test/12.jpg",
            "/assets/test/13.jpg",
            "/assets/test/7.jpg",
            "/assets/test/11.jpg",

        ]
    }
]




const Story = (
    { open,
        setOpen
    }
) => {
    const [index, setIndex] = useState(null)
    const [slider, setSlider] = useState(null);
    const [currentImagesSetIndex, setCurrentImagesSetIndex] = useState(0);
    const [sliderImages, setSliderImages] = useState(SLIDER_CONTENT[0]?.images)


    const settings = {
        dots: false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        touchMove: true,
        infinite: true,



    };

    useEffect(() => {
        if (!index)
            setIndex(0)
    }, []);

    function setCompletedSlidesStyles() {
        for (let i = 0; i <= index; i++) {
            let elem = document.getElementsByClassName("inProgress" + i);
            elem[0].style.width = 100 + "%";
            // elem[0].style.backgroundColor = "#fff"
        }
    }

    function setUnCompletedStyle() {
        console.log({ index, length: sliderImages.length })
        for (let i = index; i < sliderImages.length; i++) {
            let elem = document.getElementsByClassName("inProgress" + i);
            console.log({ elem })
            elem[0].style.width = 0 + "%";

        }
    }



    useEffect(() => {
        var width = 0;
        var id;
        var elem;
        if (index != null) {
            elem = document.getElementsByClassName("inProgress" + index);
            id = setInterval(frame, 50);
        }
        function frame() {
            width = width + 1;
            elem[0].style.width = width + "%";
            elem[0].style.backgroundColor = "#fff"
            if (width == 100) {
                clearInterval(id);
                setIndex(index + 1)
                slider.slickGoTo(index + 1);
            }
        }

        if (index == SLIDER_CONTENT[currentImagesSetIndex]?.images.length) {
            moveForward()
        }

        if (index < 0) {
            moveBackward()
        }



        return () => clearInterval(id)
    }, [index, currentImagesSetIndex])

    function nextSlide() {
        if (index + 1 == sliderImages.length) {
            moveForward()
        }
        else {
            setCompletedSlidesStyles()
            slider.slickGoTo(index + 1);
            setIndex(index + 1)
        }

    }

    function previousSlide() {
        if (index - 1 < 0) {
            moveBackward()
        }
        else {
            setUnCompletedStyle()
            slider.slickGoTo(index - 1);
            setIndex(index - 1)

        }

    }

    function goToSlide(index) {
        if (slider) {
            slider.slickGoTo(index);
        }
    }

    function moveForward() {
        setSliderImages(SLIDER_CONTENT[currentImagesSetIndex + 1].images)
        slider?.slickGoTo(0)
        setIndex(0)
        setCurrentImagesSetIndex(currentImagesSetIndex + 1)
    }
    function moveBackward() {
        setSliderImages(SLIDER_CONTENT[currentImagesSetIndex - 1].images)
        slider?.slickGoTo(0)
        setCurrentImagesSetIndex(currentImagesSetIndex - 1)
        setIndex(0)

    }

    function hasNext() {
        return currentImagesSetIndex + 1 == SLIDER_CONTENT.length
    }
    function hasPrevious() {
        return currentImagesSetIndex - 1 < 0
    }




    return (
        <div id="popup1" className={` ${!open ? "hiden" : "overlay"}`}>
            <div id="background" className="popup-background" style={{ backgroundImage: `url(${sliderImages[index]})` }} />
            <div className="popup">
                <div className="stories">
                    <Slider ref={slider => setSlider(slider)} {...settings} >
                        {
                            sliderImages.map((item, index) => <div key={index}>
                                <img key={item} src={item} />

                            </div>)
                        }


                    </Slider>
                    <div className="progressBarContainer">
                        {
                            sliderImages.map((item, current) => {
                                return <div onClick={() => goToSlide(current)} className="item" key={current}>
                                    <span data-slick-index={current} key={item} className="progressBar">
                                        <div className={"inProgress " + "inProgress" + current}></div>
                                    </span>
                                </div>
                            })
                        }


                    </div>
                    <div className="miscButtons">
                        <MdOutlineClose onClick={() => setOpen(false)} color="#fff" />
                        <FaShareAlt />
                        <HiVolumeOff />

                    </div>
                    <div className="arrows">
                        <div className="arrows_left">
                            {/* <IoMdArrowRoundBack /> */}
                            {/* <IoPlayBack /> */}
                        </div>
                        <div className="arrows_right">
                            <div onClick={nextSlide} className="arrows_right-next" >
                                <MdArrowForward />
                            </div>
                            {

                                !hasNext() && <FaForward onClick={moveForward} className="arrows_right-forward" />
                            }
                        </div>
                        <div className="arrows_left">
                            {
                                !hasPrevious() && <FaBackward stroke="#000"
                                    onClick={moveBackward}
                                />
                            }

                            <div onClick={previousSlide} className="arrows_left-previous">
                                <MdArrowBack />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Story