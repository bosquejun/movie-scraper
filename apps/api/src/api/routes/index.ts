import { VersionedRouteObjects } from "@comeback/express-lib";
import v1ApiRoutes from "./v1";

const versionedRouteObjects: VersionedRouteObjects = {
	v1: v1ApiRoutes,
};

export default versionedRouteObjects;
