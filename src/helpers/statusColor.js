export default function (status) {
  switch (status) {
    case "pendiente":
      return "bg-orange-500";


      case "confirmado":
        return "bg-green-500"

    default:
      return;
  }
}
