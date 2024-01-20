import qs from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
export default (props: any) => {
  const handleScrollTo = (element: string, obj: any) => {
    scroller.scrollTo(element, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: obj.offset ? obj.offset : -80,
    });
  };

  const location = useLocation();
  const searchUrl = qs.parse(location.search);
  const scrollTo: any = searchUrl.to;

  React.useEffect(() => {
    if (scrollTo && scrollTo == props.elementName) {
      if (props.timeout) {
        setTimeout(() => {
          handleScrollTo(props.elementName, {});
        }, props.timeout);
      } else {
        handleScrollTo(props.elementName, {});
      }
    }
  }, [scrollTo, props.is_loading]);
  return <Element name={props.elementName}>{props.children}</Element>;
};
