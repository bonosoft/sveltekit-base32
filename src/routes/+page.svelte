<script lang="ts">
    import Base32 from '$lib';

    const base32 = new Base32();
    var textEncoder = new TextEncoder();
    var textDecoder = new TextDecoder("utf-8");

    const secret = new Uint8Array(10);
    for(let i=0; i<10; i++) {
        secret[i] = Math.floor(Math.random() * 256);
    }

</script>
<h1>Testing base32.encode and base32.decode</h1>
<p>Encode BASE32("") = "", Test: "{base32.encode(textEncoder.encode(""))}", Test Decode: "{textDecoder.decode(base32.decode(""))}"</p>
<p>Encode BASE32("f") = "MY======", Test: "{base32.encode(textEncoder.encode("f"))}", Test Decode: "{textDecoder.decode(base32.decode("MY======"))}"</p>
<p>Encode BASE32("fo") = "MZXQ====", Test: "{base32.encode(textEncoder.encode("fo"))}", Test Decode: "{textDecoder.decode(base32.decode("MZXQ===="))}"</p>
<p>Encode BASE32("foo") = "MZXW6===", Test: "{base32.encode(textEncoder.encode("foo"))}", Test Decode: "{textDecoder.decode(base32.decode("MZXW6==="))}"</p>
<p>Encode BASE32("foob") = "MZXW6YQ=", Test: "{base32.encode(textEncoder.encode("foob"))}", Test Decode: "{textDecoder.decode(base32.decode("MZXW6YQ="))}"</p>
<p>Encode BASE32("fooba") = "MZXW6YTB", Test: "{base32.encode(textEncoder.encode("fooba"))}", Test Decode: "{textDecoder.decode(base32.decode("MZXW6YTB"))}"</p>
<p>Encode BASE32("foobar") = "MZXW6YTBOI======", Test: "{base32.encode(textEncoder.encode("foobar"))}", Test Decode: "{textDecoder.decode(base32.decode("MZXW6YTBOI======"))}"</p>


<h1>Testing base32.encodeString and base32.decodeString</h1>
<p>Encode BASE32("") = "", Test: "{base32.encodeString("")}", Test Decode: "{base32.decodeString("")}"</p>
<p>Encode BASE32("f") = "MY======", Test: "{base32.encodeString("f")}", Test Decode: "{base32.decodeString("MY======")}"</p>
<p>Encode BASE32("fo") = "MZXQ====", Test: "{base32.encodeString("fo")}", Test Decode: "{base32.decodeString("MZXQ====")}"</p>
<p>Encode BASE32("foo") = "MZXW6===", Test: "{base32.encodeString("foo")}", Test Decode: "{base32.decodeString("MZXW6===")}"</p>
<p>Encode BASE32("foob") = "MZXW6YQ=", Test: "{base32.encodeString("foob")}", Test Decode: "{base32.decodeString("MZXW6YQ=")}"</p>
<p>Encode BASE32("fooba") = "MZXW6YTB", Test: "{base32.encodeString("fooba")}", Test Decode: "{base32.decodeString("MZXW6YTB")}"</p>
<p>Encode BASE32("foobar") = "MZXW6YTBOI======", Test: "{base32.encodeString("foobar")}", Test Decode: "{base32.decodeString("MZXW6YTBOI======")}"</p>


<h1>Testing random value</h1>
<p>Test: {secret}, encoded: {base32.encode(secret)}, decoded: {base32.decode(base32.encode(secret))}</p>


