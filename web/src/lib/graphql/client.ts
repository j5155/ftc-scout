import {
    cacheExchange,
    type QueryInput,
    type Cache,
} from "@urql/exchange-graphcache";
import {
    Client,
    createClient,
    dedupExchange,
    fetchExchange,
} from "@urql/svelte";
import { SERVER_ORIGIN } from "../constants";
import {
    MeDocument,
    type MeQuery,
    type LoginMutation,
    type RegisterMutation,
} from "./generated/graphql-operations";
import schema from "./generated/schema.json";

type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export function betterUpdateQuery<Query>(
    cache: Cache,
    qi: QueryInput,
    fn: (q: Query) => Query
) {
    return cache.updateQuery(qi, (data) => fn(data as any) as any);
}

/**
 * Analagous to urql's `createClient`. Creates a client using the given fetch function
 * and all the correct settings.
 */
export function customCreateClient(fetch: Fetch): Client {
    return createClient({
        url: SERVER_ORIGIN,
        fetch,
        fetchOptions: {
            credentials: "include",
            cache: "no-cache",
        },
        exchanges: [
            dedupExchange,
            // cacheExchange({
            //     schema,
            //     keys: {
            //         Team: (data) => "" + data.number,
            //         Event: (data) => `${data.season}/${data.code}`,
            //         Match: (data) =>
            //             `${data.season}/${data.eventCode}/${data.id}`,
            //         MatchScores2021Traditional: () => null,
            //         MatchScores2021TraditionalAlliance: () => null,
            //         MatchScores2021Remote: () => null,
            //         TeamMatchParticipation: () => null,
            //         TeamEventParticipation: () => null,
            //     },
            //     updates: {
            //         Mutation: {
            //             logout: (_result, _args, cache, _info) => {
            //                 cache.updateQuery({ query: MeDocument }, (_) => ({
            //                     me: null,
            //                 }));
            //             },
            //             login: (result: LoginMutation, _args, cache, _info) => {
            //                 betterUpdateQuery<MeQuery>(
            //                     cache,
            //                     { query: MeDocument },
            //                     (query) => {
            //                         if (result.login.errors) {
            //                             return query;
            //                         } else {
            //                             return {
            //                                 me: result.login.user,
            //                             } as MeQuery;
            //                         }
            //                     }
            //                 );
            //             },
            //             register: (
            //                 result: RegisterMutation,
            //                 _args,
            //                 cache,
            //                 _info
            //             ) => {
            //                 betterUpdateQuery<MeQuery>(
            //                     cache,
            //                     { query: MeDocument },
            //                     (query) => {
            //                         if (result.register.errors) {
            //                             return query;
            //                         } else {
            //                             return {
            //                                 me: result.register.user,
            //                             } as MeQuery;
            //                         }
            //                     }
            //                 );
            //             },
            //         },
            //     },
            // }),
            fetchExchange,
        ],
    });
}
