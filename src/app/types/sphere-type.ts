declare module "TagCloud" {
  type Speed = "slow" | "normal" | "fast";
  interface TagCloudOptions {
    radius?: number;
    maxSpeed?: Speed;
    initSpeed?: Speed;
    direction?: number;
    keep?: boolean;
  }
  interface TagCloudInstance {
    destroy: () => void;
  }
  export default function TagCloud(
    container: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
    texts: string[],
    options?: TagCloudOptions
  ): TagCloudInstance;
}