import Nat "mo:base/Nat";

import Array "mo:base/Array";
import List "mo:base/List";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Result "mo:base/Result";
import Option "mo:base/Option";

actor {
  type BlogPost = {
    id: Nat;
    title: Text;
    content: Text;
    image: ?Blob;
    timestamp: Time.Time;
  };

  stable var posts : [BlogPost] = [];
  stable var nextId : Nat = 0;

  public query func getPosts() : async [BlogPost] {
    Array.reverse(posts)
  };

  public func addPost(title: Text, content: Text, image: ?Blob) : async Result.Result<Nat, Text> {
    let post : BlogPost = {
      id = nextId;
      title = title;
      content = content;
      image = image;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    #ok(post.id)
  };

  public func uploadImage(imageData: Blob) : async Result.Result<Blob, Text> {
    #ok(imageData)
  };
}
