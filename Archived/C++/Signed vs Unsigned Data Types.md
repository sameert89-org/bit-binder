*Unsigned* data types only store positive values (start from 0 for dimwits who doubt that).
*Signed* data types can store negative values as well.

So for the same number of bits, unsigned numbers can usually store higher MAX values.

Take C++, unsigned int (on x86_64 based machine), its effective range is $$[0, 2^{16} - 1]$$
For a signed int it is $$[-2^{16-1}, 2^{16-1} - 1]$$
if you sum the total number of elements in both ranges, it is the same.

### Storage of Signed Numbers
Storage of unsigned numbers is vanilla, no fancy tricks just stored as plane binary. But for unsigned numbers depending on platform the method differs. But they are typically stored as *2's* compliment form.


> [!INFO] The N's compliment
> For a number system with base `r`, the r's compliment of a number N with n digits is:
> `r^n - N`, similarly the r-k's compliment (so long as r - k > 1) is r^n -k -N. “rⁿ - N” just means: What number gives you 0 when you add it to N, wrapping around at 256?

The storage of signed types is done using 2's compliment form, why you ask because it 1's compliment has issues:

1. 1's compliment is calculated by inverting the bits of a number, see the problem there for +0 and -0 we have 2 separate representations. Where as 2's compliment is obtained by adding 1 to 1's compliment  (don't ask me how)
2. Carry, for addition you have to add the carry manually if the carry overflows, in 2's compliment you can just discard the msb carry.