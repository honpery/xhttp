import { ApiGroup, ServerGroup } from './type';

export function initApis<T extends ApiGroup<T>>(config: T): T {
    return config;
}

export function initServers<T extends ServerGroup<T>>(config: T): T {
    return config;
}
