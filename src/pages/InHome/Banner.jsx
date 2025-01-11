import { useEffect, useState } from "react";

const Banner = () => {
    const [activeSlide, setActiveSlide] = useState(1); // Keep track of the current slide
    const totalSlides = 3; // Total number of slides

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev % totalSlides) + 1); // Cycle through slides
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [totalSlides]);

    return (
        <div className="flex justify-center items-center w-full mx-auto rounded-2xl mt-6 lg:mt-12">
            <div className="carousel w-full relative">
                {/* Slide 1 */}
                <div
                    id="slide1"
                    className={`carousel-item relative w-full ${activeSlide === 1 ? "block" : "hidden"}`}
                >
                    <img
                        src="https://i.ibb.co.com/xM6PGbr/Great-khulna-Marathon.png"
                        className="w-full h-full object-cover rounded-2xl"
                        alt="Slide 1"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button className="btn btn-circle" onClick={() => setActiveSlide(6)}>❮</button>
                        <button className="btn btn-circle" onClick={() => setActiveSlide(2)}>❯</button>
                    </div>
                </div>

                {/* Slide 2 */}
                <div
                    id="slide2"
                    className={`carousel-item relative w-full ${activeSlide === 2 ? "block" : "hidden"}`}
                >
                    <img
                        src="https://i.ibb.co.com/gVkjPhM/Great-Dhaka-Marathon.png"
                        className="w-full h-full object-cover rounded-2xl"
                        alt="Slide 2"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button className="btn btn-circle" onClick={() => setActiveSlide(1)}>❮</button>
                        <button className="btn btn-circle" onClick={() => setActiveSlide(3)}>❯</button>
                    </div>
                </div>

                {/* Slide 3 */}
                <div
                    id="slide3"
                    className={`carousel-item relative w-full ${activeSlide === 3 ? "block" : "hidden"}`}
                >
                    <img
                        src="https://i.ibb.co.com/1XNDw3s/Great-Sylhet-Marathon.png"
                        className="w-full h-full object-cover rounded-2xl"
                        alt="Slide 3"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button className="btn btn-circle" onClick={() => setActiveSlide(2)}>❮</button>
                        <button className="btn btn-circle" onClick={() => setActiveSlide(1)}>❯</button>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Banner;
