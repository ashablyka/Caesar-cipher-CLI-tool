# Caesar-cipher-CLI-tool

## Prepare and run the app

 - Download this repository
 - Open your command line tool
 - Go to *Caesar-cipher-CLI-tool* folder
 - Run ```npm install```
 - Run ```node caesar_cli [arguments]```


 ### Arguments:

 -  **-s, --shift**: a shift
 -  **-i, --input**: an input file
 -  **-o, --output**: an output file
 -  **-a, --action**: an action encode/decode

 ### Details:

 - Action (encode/decode) and the shift are required
 - If the input file is missed - use console as an input source.
 - If the output file is missed - use console as an output destination
 - Only the English alphabet will be encoded/decoded, all other characters will be kept untouched.

 ### Usage example:

 ```bash
$ node caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
> input.txt
> `Hello World :)`

> output.txt
> `Olssv Dvysk :)`
