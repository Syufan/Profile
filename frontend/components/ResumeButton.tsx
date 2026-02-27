import { FiDownload } from "react-icons/fi";

const RESUME_URL = "https://jeff-zhang-assets.s3.ap-southeast-1.amazonaws.com/jeff-zhang-resume.pdf";

export default function ResumeButton() {
  return (
    <a
      href={RESUME_URL}
      download
      className="text-slate-400 hover:text-white transition-colors duration-150 flex items-center gap-1 text-sm mt-8 group"
    >
      Resume <FiDownload size={14} className="transition-transform duration-150 group-hover:scale-135" />
    </a>
  );
}
