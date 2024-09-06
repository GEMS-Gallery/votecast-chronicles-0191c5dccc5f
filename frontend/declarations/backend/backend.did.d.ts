import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface BlogPost {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'timestamp' : Time,
  'image' : [] | [Uint8Array | number[]],
}
export type Result = { 'ok' : Uint8Array | number[] } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'addPost' : ActorMethod<
    [string, string, [] | [Uint8Array | number[]]],
    Result_1
  >,
  'getPosts' : ActorMethod<[], Array<BlogPost>>,
  'uploadImage' : ActorMethod<[Uint8Array | number[]], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
