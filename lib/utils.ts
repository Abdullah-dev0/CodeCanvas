import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const cleanHtmlContent = (html: any) => {
  // Create a temporary element to manipulate the HTML
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;

  tempElement.querySelectorAll("br").forEach((br) => br.remove());

  const cleanedHtml = tempElement.innerHTML.replace(/\s\s+/g, " ");

  return cleanedHtml;
};
export function formUrlQuery({ params, key, value }: any) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
