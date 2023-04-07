# Base32 encode or decode for SvelteKit
With this module, you are able use base32 encoding on you Sveltekit site. 

## Install
Use your package manager to install the module:
```shell
npm install @bonosoft/sveltekit-base32
```

## Using base32 in a svelte file in SvelteKit
Now you can start using the Base32 class in your pages.
```ts
<script lang="ts">
  import Base32 from "@bonosoft/sveltekit-base32"
  const base32 = new Base32();
</script>
```

## Encode or EncodeString
With the encode you can use base32 to tranform your data info a string of standard capital letters and digits. The encoding is not an encryption, and can easily be transformed back into the original data.
```ts
    var myEncodedString = base32.encodeString("mySecret");

    const secret = new Uint8Array(10);
    for(let i=0; i<10; i++) {
        secret[i] = Math.floor(Math.random() * 256);
    }
    let base32secret: string = base32.encode(secret);
```

## Decode or DecodeString
The decode functions return the base32 strings back into your original data.
```ts
    var mySecret : string = base32.decodeString("NV4VGZLDOJSXI===");

    console.log( base32.decode("5GJGHSQGJXXNSB5Y") );
```

## TOTP Time based One Time Password secrets
Most TOTP applications requires that your shared secret is a base32 encoded string.<br>
In your browser you are able to make a more secure random secret for your TOTP app.
```ts
    const secret = new Uint8Array(10);
    self.crypto.getRandomValues(secret);

    let totpsecret: string = base32.encode(secret);

```
