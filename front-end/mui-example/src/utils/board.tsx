import Label from "../components/label";

export function BoardLabelComponent(category:string) {
 switch (category) {
    case 'notice':
      return (
        <Label variant="soft" color="info">
          공지
        </Label>
      );
    case 'news':
      return (
        <Label variant="soft" color="secondary">
          뉴스
        </Label>
      );
    default:
      return (
        <Label variant="soft" color="default">
          -
        </Label>
      );
  }
}
