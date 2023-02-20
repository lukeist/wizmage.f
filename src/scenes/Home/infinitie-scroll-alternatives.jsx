// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   FormField,
//   Card,
//   Loader,
//   Slideshow,
//   useInfinityScroll,
// } from "../../components";
// import translations from "../../config/translations.json";

// const RenderCards = React.memo(({ data, title }) => {
//   if (data?.length > 0)
//     return data.map((post) => {
//       return <Card key={post._id} {...post} />;
//     });
//   return (
//     <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
//   );
// });

// const Home = () => {
//   const [searchText, setSearchText] = useState("");
//   const [searchedResults, setSearchedResults] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   // Set current language for based on user's browser
//   const [locale, setLocale] = useState("en");
//   const checkBrowserLanguage = () => {
//     const browserLanguage = navigator.language.slice(0, 2);
//     browserLanguage in translations && setLocale(browserLanguage);
//   };

//   useEffect(() => {
//     checkBrowserLanguage();
//   }, []);
//   const currentLanguage = translations[locale];

//   // Infinite Scrolling ---------------------------------------
//   const [error, setError] = useState(false);
//   const [allPosts, setAllPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const componentsToShow = useMemo(() => {
//     return allPosts;
//   }, [allPosts]);

//   const divRef = useRef(null);
//   let isVisible = useInfinityScroll(divRef);

//   const fetchPosts = async (page) => {
//     setLoading(true);
//     try {
//       // set limit for lazy loading
//       const limit = 12;
//       const url = `${
//         import.meta.env.VITE_API_POST
//       }?page=${page}&limit=${limit}`;
//       if (url) {
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const { data, currentPage, totalPages } = await response.json();
//           const newPosts = [...allPosts, ...data];
//           setAllPosts(newPosts);
//           setCurrentPage(currentPage);
//           totalPages !== 1 && setTotalPages(totalPages);
//         }
//       } else {
//         throw new Error("VITE_API_POST environment variable is not defined");
//       }
//     } catch (error) {
//       setError(true);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(currentPage);
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;
//     fetchPosts(currentPage + 1);
//   }, [isVisible]);

//   // Search Posts
//   const handleSearchChange = (e) => {
//     clearTimeout(searchTimeout);
//     setSearchText(e.target.value);

//     setSearchTimeout(
//       setTimeout(() => {
//         const searchResults = allPosts.filter(
//           (item) =>
//             item.name.toLowerCase().includes(searchText.toLowerCase()) ||
//             item.prompt.toLowerCase().includes(searchText.toLowerCase())
//         );

//         setSearchedResults(searchResults);
//       }, 500)
//     );
//   };

//   // Parallax effect
//   const bgRef = useRef(null);
//   const contentRef = useRef(null);
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.pageYOffset;
//       const bg = bgRef.current;
//       const content = contentRef.current;

//       if (bg && content) {
//         bg.style.transform = `translateY(-${scrollTop * 0.2}px)`;
//         content.style.transform = `translateY(-${scrollTop * 0.8}px)`;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <section
//       className="parallax-container"
//       id="scrollableDiv"
//       style={{ overflowY: "scroll" }}
//     >
//       <div ref={bgRef} className="parallax-bg">
//         <Slideshow
//           currentLanguage={currentLanguage}
//           firstThree={allPosts && allPosts.slice(0, 3)}
//         />
//       </div>
//       <div
//         ref={contentRef}
//         className="parallax-content absolute z-10 sm:p-8 px-4 py-8 pt-14 w-full min-h-[calc(100vh-73px)]"
//         style={{
//           boxShadow: "0 0 50px rgba(0, 0, 0, 0.5)",
//         }}
//       >
//         <div className="max-w-7xl mx-auto mt-20">
//           <div>
//             <h1 className="font-extrabold text-[#222328] text-[32px]">
//               {currentLanguage.txtCommunityShowcase}
//             </h1>
//             <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
//               {currentLanguage.txtCommunityShowcaseSub}
//             </p>
//           </div>
//           <div className="mt-16">
//             <FormField
//               btnName={currentLanguage.btnSurpriseMe}
//               labelName={currentLanguage.placeholderSearchPost}
//               type="text"
//               name="text"
//               placeholder={currentLanguage.placeholderSearchPost}
//               value={searchText}
//               handleChange={handleSearchChange}
//             />
//           </div>
//           <div className="mt-10">
//             {loading ? (
//               error ? (
//                 <div>Failed to fetch data. Please try again later.</div>
//               ) : (
//                 <div className="flex justify-center items-center">
//                   <Loader />
//                 </div>
//               )
//             ) : (
//               <>
//                 {searchText && (
//                   <h2 className="font-medium text=[#666e75] text-xl mb-3">
//                     {currentLanguage.txtSearchResults}
//                     <span className="text-[#222328]">{searchText} </span>
//                   </h2>
//                 )}
//                 <div
//                   className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2
//                 grid-cols-1 gap-3"
//                 >
//                   {searchText ? (
//                     <RenderCards
//                       hasMore={currentPage < totalPages}
//                       loading={loading}
//                       data={searchedResults}
//                       title={currentLanguage.txtNoSearchResultsFound}
//                       setCurrentPage={setCurrentPage}
//                     />
//                   ) : (
//                     <RenderCards
//                       hasMore={currentPage < totalPages}
//                       loading={loading}
//                       data={componentsToShow}
//                       title={currentLanguage.txtNoPostsFound}
//                       setCurrentPage={setCurrentPage}
//                     />
//                   )}
//                 </div>
//                 <div ref={divRef} />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;

// // // web dev simplified https://www.youtube.com/watch?v=NZKUirTtxcg
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { FormField, Card, Loader, Slideshow } from "../../components";
// import translations from "../../config/translations.json";

// const RenderCards = ({ loading, hasMore, data, title, setCurrentPage }) => {
//   const observer = useRef(null);
//   const lastPhotoRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           console.log("Visible");
//           setCurrentPage((prevPage) => prevPage + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   if (data?.length > 0)
//     return data.map((post, index) => {
//       if (index === data.length - 1)
//         return <Card ref={lastPhotoRef} key={post._id} {...post} />;
//       return <Card key={post._id} {...post} />;
//     });
//   return (
//     <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
//   );
// };

// const Home = () => {
//   const [error, setError] = useState(false);
//   const [allPosts, setAllPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [searchedResults, setSearchedResults] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   // Set current language for based on user's browser
//   const [locale, setLocale] = useState("en");
//   const checkBrowserLanguage = () => {
//     const browserLanguage = navigator.language.slice(0, 2);
//     browserLanguage in translations && setLocale(browserLanguage);
//   };

//   useEffect(() => {
//     checkBrowserLanguage();
//   }, []);
//   const currentLanguage = translations[locale];

//   // Infinite Scrolling
//   const fetchPosts = async (page) => {
//     setLoading(true);
//     try {
//       // set limit for lazy loading
//       const limit = 12;
//       const url = `${
//         import.meta.env.VITE_API_POST
//       }?page=${page}&limit=${limit}`;
//       if (url) {
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const { data, currentPage, totalPages } = await response.json();
//           const newPosts = [...allPosts, ...data];
//           setAllPosts(newPosts);

//           // setAllPosts(allPosts.concat(data));
//           setCurrentPage(currentPage);
//           setTotalPages(totalPages);
//         }
//       } else {
//         throw new Error("VITE_API_POST environment variable is not defined");
//       }
//     } catch (error) {
//       setError(true);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(currentPage);
//   }, [currentPage]);

//   window.onscroll = function (e) {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Search Posts
//   const handleSearchChange = (e) => {
//     clearTimeout(searchTimeout);
//     setSearchText(e.target.value);

//     setSearchTimeout(
//       setTimeout(() => {
//         const searchResults = allPosts.filter(
//           (item) =>
//             item.name.toLowerCase().includes(searchText.toLowerCase()) ||
//             item.prompt.toLowerCase().includes(searchText.toLowerCase())
//         );

//         setSearchedResults(searchResults);
//       }, 500)
//     );
//   };

//   // Parallax effect
//   const bgRef = useRef(null);
//   const contentRef = useRef(null);
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.pageYOffset;
//       const bg = bgRef.current;
//       const content = contentRef.current;

//       if (bg && content) {
//         bg.style.transform = `translateY(-${scrollTop * 0.2}px)`;
//         content.style.transform = `translateY(-${scrollTop * 0.8}px)`;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <section
//       className="parallax-container"
//       id="scrollableDiv"
//       style={{ overflowY: "scroll" }}
//     >
//       <div ref={bgRef} className="parallax-bg">
//         <Slideshow
//           currentLanguage={currentLanguage}
//           firstThree={allPosts && allPosts.slice(0, 3)}
//         />
//       </div>
//       <div
//         ref={contentRef}
//         className="parallax-content absolute z-10 sm:p-8 px-4 py-8 pt-14 w-full min-h-[calc(100vh-73px)]"
//         style={{
//           boxShadow: "0 0 50px rgba(0, 0, 0, 0.5)",
//         }}
//       >
//         <div className="max-w-7xl mx-auto mt-20">
//           <div>
//             <h1 className="font-extrabold text-[#222328] text-[32px]">
//               {currentLanguage.txtCommunityShowcase}
//             </h1>
//             <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
//               {currentLanguage.txtCommunityShowcaseSub}
//             </p>
//           </div>
//           <div className="mt-16">
//             <FormField
//               btnName={currentLanguage.btnSurpriseMe}
//               labelName={currentLanguage.placeholderSearchPost}
//               type="text"
//               name="text"
//               placeholder={currentLanguage.placeholderSearchPost}
//               value={searchText}
//               handleChange={handleSearchChange}
//             />
//           </div>
//           <div className="mt-10">
//             {
//               // loading ? (
//               error ? (
//                 <div>Failed to fetch data. Please try again later.</div>
//               ) : (
//                 // ) : (
//                 // <div className="flex justify-center items-center">
//                 // Loading...
//                 // </div>
//                 // )
//                 <>
//                   {searchText && (
//                     <h2 className="font-medium text=[#666e75] text-xl mb-3">
//                       {currentLanguage.txtSearchResults}
//                       <span className="text-[#222328]">{searchText} </span>
//                     </h2>
//                   )}
//                   <div
//                     className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2
//                 grid-cols-1 gap-3"
//                   >
//                     {searchText ? (
//                       <RenderCards
//                         hasMore={currentPage < totalPages}
//                         loading={loading}
//                         data={searchedResults}
//                         title={currentLanguage.txtNoSearchResultsFound}
//                         setCurrentPage={setCurrentPage}
//                       />
//                     ) : (
//                       <RenderCards
//                         hasMore={currentPage < totalPages}
//                         loading={loading}
//                         data={allPosts && allPosts.slice(3)}
//                         title={currentLanguage.txtNoPostsFound}
//                         setCurrentPage={setCurrentPage}
//                       />
//                     )}
//                   </div>
//                 </>
//               )
//             }
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;

// USING InfiniteScroll
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FormField,
  Card,
  Loader,
  Slideshow,
  EndMessage,
} from "../../components";
import translations from "../../config/translations.json";
import InfiniteScroll from "react-infinite-scroll-component";

const RenderCards = React.memo(({ data, title }) => {
  // memoize the component
  if (data?.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
});

const Home = () => {
  const [error, setError] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Set current language for based on user's browser
  const [locale, setLocale] = useState("en");
  const checkBrowserLanguage = () => {
    const browserLanguage = navigator.language.slice(0, 2);
    browserLanguage in translations && setLocale(browserLanguage);
  };

  useEffect(() => {
    checkBrowserLanguage();
  }, []);
  const currentLanguage = translations[locale];

  // Infinite Scrolling
  const fetchPosts = async (page) => {
    // setLoading(true);
    try {
      // set limit for lazy loading
      const limit = 6;
      const url = `${
        import.meta.env.VITE_API_POST
      }?page=${page}&limit=${limit}`;
      if (url) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const { data, currentPage, totalPages } = await response.json();
          const newPosts = [...allPosts, ...data];
          setAllPosts(newPosts);
          setCurrentPage(currentPage);
          setTotalPages(totalPages);
        }
      } else {
        throw new Error("VITE_API_POST environment variable is not defined");
      }
    } catch (error) {
      setError(true);
      console.log(error);
      // } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect loading once");
    fetchPosts(currentPage);
  }, []);

  const loadMore = () => {
    if (currentPage < totalPages) {
      fetchPosts(currentPage + 1);
    }
  };

  // Search Posts
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  // Parallax effect
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const bg = bgRef.current;
      const content = contentRef.current;

      if (bg && content) {
        bg.style.transform = `translateY(-${scrollTop * 0.2}px)`;
        content.style.transform = `translateY(-${scrollTop * 0.8}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className="parallax-container"
      id="scrollableDiv"
      style={{ overflowY: "scroll" }}
    >
      <div ref={bgRef} className="parallax-bg">
        <Slideshow
          currentLanguage={currentLanguage}
          firstThree={allPosts && allPosts.slice(0, 3)}
        />
      </div>
      <div
        ref={contentRef}
        className="parallax-content absolute z-10 sm:p-8 px-4 py-8 pt-14 w-full min-h-[calc(100vh-73px)]"
        style={{
          boxShadow: "0 0 50px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="max-w-7xl mx-auto mt-20">
          <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">
              {currentLanguage.txtCommunityShowcase}
            </h1>
            <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
              {currentLanguage.txtCommunityShowcaseSub}
            </p>
          </div>
          <div className="mt-16">
            <FormField
              btnName={currentLanguage.btnSurpriseMe}
              labelName={currentLanguage.placeholderSearchPost}
              type="text"
              name="text"
              placeholder={currentLanguage.placeholderSearchPost}
              value={searchText}
              handleChange={handleSearchChange}
            />
          </div>
          <div className="mt-10">
            {
              // loading ? (
              error ? (
                <div>Failed to fetch data. Please try again later.</div>
              ) : (
                // ) : (
                // <div className="flex justify-center items-center">
                // <Loader />
                // </div>
                // )
                <>
                  {searchText && (
                    <h2 className="font-medium text=[#666e75] text-xl mb-3">
                      {currentLanguage.txtSearchResults}
                      <span className="text-[#222328]">{searchText} </span>
                    </h2>
                  )}
                  <InfiniteScroll
                    className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3"
                    style={{ overflow: "hidden" }} // stop glitching with <Loader/>
                    dataLength={allPosts.length}
                    next={loadMore}
                    hasMore={currentPage < totalPages}
                    loader={<Loader />}
                    endMessage={<EndMessage />}
                    scrollableTarget="scrollableDiv"
                  >
                    {searchText ? (
                      <RenderCards
                        data={searchedResults}
                        title={currentLanguage.txtNoSearchResultsFound}
                      />
                    ) : (
                      <RenderCards
                        data={allPosts.slice(3)}
                        title={currentLanguage.txtNoPostsFound}
                      />
                    )}
                  </InfiniteScroll>
                </>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

// ***************************************************************************** ASK STACKOVERFLOW?
// // TESTING CALLBACK

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Card } from "../../components";

// const RenderCards = ({ loading, hasMore, data, title, setCurrentPage }) => {
//   const observer = useRef(null);
//   const lastPhotoRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           console.log("Visible");
//           setCurrentPage((prevPage) => prevPage + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   if (data?.length > 0)
//     return data.map((post, index) => {
//       if (index === data.length - 1)
//         return <Card ref={lastPhotoRef} key={post._id} {...post} />;
//       return <Card key={post._id} {...post} />;
//     });
//   return (
//     <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
//   );
// };

// const Home = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Infinite Scrolling
//   const fetchPosts = async (page) => {
//     setLoading(true);
//     try {
//       // set limit for lazy loading
//       const limit = 12;
//       const url = `${
//         import.meta.env.VITE_API_POST
//       }?page=${page}&limit=${limit}`;
//       if (url) {
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const { data, currentPage, totalPages } = await response.json();
//           const newPosts = [...allPosts, ...data];
//           setAllPosts(newPosts);

//           // setAllPosts(allPosts.concat(data));
//           setCurrentPage(currentPage);
//           setTotalPages(totalPages);
//         }
//       } else {
//         throw new Error("VITE_API_POST environment variable is not defined");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(currentPage);
//   }, [currentPage]);

//   window.onscroll = function (e) {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <section>
//       <RenderCards
//         hasMore={currentPage < totalPages}
//         loading={loading}
//         data={allPosts.slice(3)}
//         title="title"
//         setCurrentPage={setCurrentPage}
//       />
//     </section>
//   );
// };

// export default Home;

// // // TESTING INFINITIVE SCROLL COMPONENT
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { FormField, Card, Loader, Slideshow } from "../../components";
// import translations from "../../config/translations.json";
// import InfiniteScroll from "react-infinite-scroll-component";

// const RenderCards = React.memo(({ data, title }) => {
//   // memoize the component
//   if (data?.length > 0)
//     return data.map((post) => <Card key={post._id} {...post} />);
//   return (
//     <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
//   );
// });

// const Home = () => {
//   const [error, setError] = useState(false);
//   const [allPosts, setAllPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [searchedResults, setSearchedResults] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   // Infinite Scrolling
//   const fetchPosts = async (page) => {
//     setLoading(true);
//     try {
//       // set limit for lazy loading
//       const limit = 12;
//       const url = `${
//         import.meta.env.VITE_API_POST
//       }?page=${page}&limit=${limit}`;
//       if (url) {
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const { data, currentPage, totalPages } = await response.json();
//           const newPosts = [...allPosts, ...data];
//           setAllPosts(newPosts);
//           setCurrentPage(currentPage);
//           setTotalPages(totalPages);
//         }
//       } else {
//         throw new Error("VITE_API_POST environment variable is not defined");
//       }
//     } catch (error) {
//       setError(true);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log(currentPage);
//     fetchPosts(currentPage);
//   }, []);

//   const loadMore = () => {
//     if (currentPage < totalPages) {
//       fetchPosts(currentPage + 1);
//     }
//   };

//   // Search Posts
//   const handleSearchChange = (e) => {
//     clearTimeout(searchTimeout);
//     setSearchText(e.target.value);

//     setSearchTimeout(
//       setTimeout(() => {
//         const searchResults = allPosts.filter(
//           (item) =>
//             item.name.toLowerCase().includes(searchText.toLowerCase()) ||
//             item.prompt.toLowerCase().includes(searchText.toLowerCase())
//         );

//         setSearchedResults(searchResults);
//       }, 500)
//     );
//   };

//   // Parallax effect
//   const bgRef = useRef(null);
//   const contentRef = useRef(null);
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.pageYOffset;
//       const bg = bgRef.current;
//       const content = contentRef.current;

//       if (bg && content) {
//         bg.style.transform = `translateY(-${scrollTop * 0.2}px)`;
//         content.style.transform = `translateY(-${scrollTop * 0.8}px)`;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <section
//       className="parallax-container"
//       id="scrollableDiv"
//       style={{ overflowY: "scroll" }}
//     >
//       <InfiniteScroll
//         className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3"
//         dataLength={allPosts.length}
//         next={loadMore}
//         hasMore={currentPage < totalPages}
//         loader={<h4>Loading...</h4>}
//         endMessage={<h4>No more posts to load.</h4>}
//         scrollableTarget="scrollableDiv"
//       >
//         <RenderCards data={allPosts && allPosts.slice(3)} title="title" />
//       </InfiniteScroll>
//     </section>
//   );
// };

// export default Home;
