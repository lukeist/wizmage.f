// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function useSearchLazy(query, pageNumber) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [photos, setPhotos] = useState([]);
//   const [hasMore, setHasMore] = useState(false);

//   useEffect(() => {
//     // anytime we change the query, photos = [] or the last result will still be there
//     setPhotos([]);
//   }, [query]);

//   useEffect(() => {
//     setLoading(true);
//     setError(false);
//     let cancel;
//     axios({
//       method: "GET",
//       url: process.env.VITE,
//       params: { q: query, page: pageNumber },
//       cancelToken: new axios.CancelToken((c) => (cancel = c)),
//     })
//       .then((res) => {
//         setPhotos((prevPhotos) => {
//           return [
//             // no duplicate photos inside this array:
//             ...new Set([
//               ...prevPhotos,
//               ...res.data, // here to add searched data res.data.docs.map(photo => photo.url) for example
//             ]),
//           ];
//         });
//         setHasMore(res.data.length > 0); // setHasMore(res.data.photos.length > 0)
//         setLoading(false);
//         console.log(res.data);
//       })
//       .catch((e) => {
//         if (axios.isCancel(e)) return;
//         setError(true);
//       });
//     return () => cancel();
//   }, [query, pageNumber]);

//   return { loading, error, photos, hasMore };
// }
// /////////////////////////////////////////////////////////////////
// // useEffect(() => {
// //   setLoading(true);
// //   setError(false);
// //   let cancel;
// //   axios({
// //     method: "GET",
// //     url: `${import.meta.env.VITE_API_POST}?page=${page}&limit=12`,
// //     params: { page: currentPage },
// //     cancelToken: new axios.CancelToken((c) => (cancel = c)),
// //   })
// //     .then((res) => {
// //       setPhotos((prevData) => {
// //         return [
// //           // no duplicate photos inside this array:
// //           ...new Set([
// //             ...prevData,
// //             ...res.data.data, // here to add searched data res.data.docs.map(photo => photo.url) for example
// //           ]),
// //         ];
// //       });
// //       setHasMore(res.data.data.length > 0); // setHasMore(res.data.photos.length > 0)
// //       setLoading(false);
// //       console.log(res.data);
// //     })
// //     .catch((e) => {
// //       if (axios.isCancel(e)) return;
// //       setError(true);
// //     });
// //   return () => cancel();
// // }, [pageNumber]);
