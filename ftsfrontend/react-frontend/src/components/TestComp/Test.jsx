import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const QuickDeleteTest = () => {
  useEffect(() => {
    axios.delete("http://127.0.0.1:8000/test-destroy/", {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      withCredentials: true,
    })
    .then(res => console.log("✅ Axios DELETE success", res.data))
    .catch(err => console.error("❌ Axios DELETE failed", err));
  }, []);

  return <div>DELETE test triggered. Check backend console.</div>;
};

export default QuickDeleteTest;
