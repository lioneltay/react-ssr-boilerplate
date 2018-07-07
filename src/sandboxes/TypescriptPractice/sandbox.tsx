type StringKeyof<T> = Extract<keyof T, string>

type WithoutFoo = Omit<{ foo: string }, "foo"> // ok

type WithoutFooGeneric<P extends { foo: string }> = Omit<P, "foo"> // Error: Type '"foo"'
