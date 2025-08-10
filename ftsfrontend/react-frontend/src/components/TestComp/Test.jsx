// import axios from "axios";
// import Cookies from "js-cookie";
// import { useEffect } from "react";

// const QuickDeleteTest = () => {
//   const API_BASE_URL = import.meta.env.VITE_API_URL;
//   useEffect(() => {
//     axios.delete(`${API_BASE_URL}/test-destroy/`, {
//       headers: {
//         "X-CSRFToken": Cookies.get("csrftoken"),
//       },
//       withCredentials: true,
//     })
//     .then(res => console.log("✅ Axios DELETE success", res.data))
//     .catch(err => console.error("❌ Axios DELETE failed", err));
//   }, []);

//   return <div>DELETE test triggered. Check backend console.</div>;
// };

// export default QuickDeleteTest;
