# Build instructions

Build by running `./build.sh` — it downloads the specified version of `@grpc/grpc-js`, patches it,
and puts it into `./package`.

`./package` is a build artifact and is present in the repo just for convenience/visibility.

## Publishing

Publishing happens from the `./package` dir (just run `npm publish` in it).

That directory is generated with `./build.sh` script.

It's recommended to check the diff of the `./package` dir before publishing, e.g. with `git diff`.

## Warning

Generated `_pb.js` files need patching!

See [fix_pb.sh](./fix_pb.sh) file for replacements in `*_pb.js` files.

Usage: `./fix_pb.sh path-to-pbs/*_pb.js`.
