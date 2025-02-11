import { toast } from "nextjs-toast-notify";

export function mostarToast(msj, type) {
  toast[type](msj, {
    duration: 5000,
    progress: true,
    position: "top-right",
    transition: "swingInverted",
    sound: true,
  });
}
