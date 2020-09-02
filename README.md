# Build instructions

Build by running `./build.sh` — it downloads the specified version of `@grpc/grpc-js`, patches it,
and puts it into `./package`.

`./package` is a build artifact and is present in the repo just for convenience/visibility.

## Warning

This package is incompatible with original google-protobuf, and generated _pb.js files need patching.

See [build.sh](./build.sh) file for replacements in `*_pb.js` files.
