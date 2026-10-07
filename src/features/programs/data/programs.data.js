import { FaHeart, FaUsers, FaLeaf, FaGraduationCap } from "react-icons/fa";

const programs = [
  {
    id: 1,
    title: "العمل الإنساني",
    description:
      "نقدم المساعدات الإنسانية للأشخاص والأسر الأكثر احتياجًا، ونساهم في الاستجابة للأزمات والطوارئ.",
    icon: FaHeart,
    link: "/programs/humanitarian",
  },
  {
    id: 2,
    title: "دعم المجتمع",
    description:
      "نعمل على دعم المجتمعات المحلية وتعزيز قدرتها على مواجهة التحديات وتحسين ظروف الحياة.",
    icon: FaUsers,
    link: "/programs/community-support",
  },
  {
    id: 3,
    title: "التنمية المستدامة",
    description:
      "ننفذ مبادرات تنموية تهدف إلى تحقيق أثر مستدام وتحسين فرص المجتمع على المدى الطويل.",
    icon: FaLeaf,
    link: "/programs/sustainable-development",
  },
  {
    id: 4,
    title: "تمكين الشباب",
    description:
      "نساهم في تمكين الشباب وتطوير مهاراتهم وتعزيز مشاركتهم الفاعلة في المجتمع.",
    icon: FaGraduationCap,
    link: "/programs/youth-empowerment",
  },
];

export default programs;
