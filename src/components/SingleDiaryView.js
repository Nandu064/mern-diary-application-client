import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Card,
  CardHeader,
  Button,
  CardBody,
} from "reactstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL, getUserDetails } from "../helpers/constants";
import DOMPurify from "dompurify";

function SingleDiaryView(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [pages, setPages] = useState([]);

  const { id } = useParams();
  console.log("id: ", id);

  const next = () => {
    console.log("pages.length: ", pages.length);
    if (animating) return;
    const nextIndex = activeIndex === pages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? pages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    axios.get(`${API_URL}/diary/get-diary-by-id/${id}`).then((res) => {
      console.log("res: ", res);
      setPages(res.data?.[0]?.page_id ?? []);
    });
  }, []);

  const slides = pages.map((page) => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={page._id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        {/* <CarouselCaption
          className="text-danger"
          captionText={`
          `}
          captionHeader={page.caption}
        /> */}
        <div
          style={{
            height: "100%",
            // background: "red",
            // color: "#fff",
          }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(page?.content),
          }}
        >
          {/* {page?.content} */}
        </div>
      </CarouselItem>
    );
  });

  return (
    <div className="mt-3">
      <style>
        {`.custom-tag {
              max-width: 100%;
              height: 500px;
              background: #ccc;
              overflow:auto;
            }`}
      </style>
      <Card className="border-0">
        <CardHeader className="border-0 bg-transparent d-flex justify-content-end">
          <Button color="success">
            <Link
              to={{
                pathname: `/${id}/add-page`,
                state: {
                  diary_id: id,
                },
              }}
              // href="/add-page"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Add New Page
            </Link>
          </Button>
        </CardHeader>
        <CardBody className="bg-transparent border-0">
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            {/* <CarouselIndicators
          pages={pages}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        /> */}
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
        </CardBody>
      </Card>
    </div>
  );
}

export default SingleDiaryView;
