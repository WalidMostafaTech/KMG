import { useEffect } from "react";

const SeoManager = ({ title, description, keywords }) => {
  useEffect(() => {
    // تحديث title
    document.title = title || "Al-Moayed";

    // تحديث أو إنشاء meta description
    let desc = document.querySelector("meta[name='description']");
    if (!desc) {
      desc = document.createElement("meta");
      desc.name = "description";
      document.head.appendChild(desc);
    }
    desc.content = description || "";

    // تحديث أو إنشاء meta keywords
    let keys = document.querySelector("meta[name='keywords']");
    if (!keys) {
      keys = document.createElement("meta");
      keys.name = "keywords";
      document.head.appendChild(keys);
    }
    keys.content = keywords?.length ? keywords.join(", ") : "";
  }, [title, description, keywords]);

  return null;
};

export default SeoManager;
