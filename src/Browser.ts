import { Layout } from "./UI/AppLayout";

function deindent(str) {
    function getPadLen(line) {
        for (let i = 0; i < line.length; i++)
            if (line[i] !== ' ')
                return i;
        return -1; // whitespace line => pad === 0
    }

    const lines = str.split("\n");
    if (getPadLen(lines[0]) === -1)
        lines.shift();

    const minPadLen = Math.min.apply(null, lines.map(getPadLen).filter(x => x !== -1));
    const newStr = lines.map(x => x.length !== 0 ? x.substr(minPadLen) : x).join("\n");
    return newStr;
}

const langConfigs = {
    cpp: {
        port: 8000,
        request: {
            lang: "CPP",
            code: deindent(`
                #include <iostream>
                    
                class TestClass {
                    public:
                    void testMethod() {
                        std::cout << "Hello World!\\n";
                    }
                };
                
                int main()
                {
                    TestClass c;
                    c.testMethod();
                    return 0;
                }`)
        }
    },
    csharp: {
        port: 8000,
        request: {
            lang: "CSharp",
            code: deindent(`
                using System;
                
                public class TestClass
                {
                    public void TestMethod()
                    {
                        Console.WriteLine("Hello World!");
                    }
                }
                
                public class HelloWorld
                {
                    static public void Main()
                    {
                        new TestClass().TestMethod();
                    }
                }`)
        }
    },
    go: {
        port: 8000,
        request: {
            lang: "Go",
            code: deindent(`
                package main
                
                import "fmt"
                
                type testClass struct {
                }
                
                func (this *testClass) testMethod() {
                    fmt.Println("Hello World!")
                }
                
                func main() {
                    c := (testClass{})
                    c.testMethod()
                }`)
        }
    },
    java: {
        port: 8001,
        request: {
            code: deindent(`
                public class TestClass {
                    public String testMethod() {
                        return "Hello World!";
                    }
                }`),
            className: 'TestClass',
            methodName: 'testMethod'
        }
    },
    javascript: {
        port: 8002,
        request: {
            code: deindent(`
                class TestClass {
                    testMethod() {
                        return "Hello World!";
                    }
                }
                
                new TestClass().testMethod()`),
        }
    },
    php: {
        port: 8000,
        request: {
            lang: "PHP",
            code: deindent(`
                <?php
                
                class TestClass {
                    function testMethod() {
                        print("Hello World!\\n");
                    }
                }
                
                $c = new TestClass();
                $c->testMethod();`)
        }
    },
    perl: {
        port: 8000,
        request: {
            lang: "Perl",
            code: deindent(`
                use strict;
                use warnings;
                
                package TestClass;
                sub new
                {
                    my $class = shift;
                    my $self = {};
                    bless $self, $class;
                    return $self;
                }
                
                sub testMethod {
                    print "Hello World!\\n";
                }
                
                package Program;
                my $c = new TestClass();
                $c->testMethod()`)
        }
    },
    python: {
        port: 8000,
        request: {
            lang: "Python",
            code: deindent(`
                class TestClass:
                    def test_method(self):
                        print "Hello World!"

                TestClass().test_method()`)
        }
    },
    ruby: {
        port: 8000,
        request: {
            lang: "Ruby",
            code: deindent(`
                class TestClass
                    def test_method
                        puts "Hello World!"
                    end
                end
                
                TestClass.new().test_method()`)
        }
    },
    swift: {
        port: 8000,
        request: {
            lang: "Swift",
            code: deindent(`
                class TestClass {
                    func testMethod() {
                        print("Hello World!")
                    }
                }
                
                TestClass().testMethod()`)
        }
    },
    typescript: {
        port: 8002,
        request: {
            lang: "TypeScript",
            code: deindent(`
                class TestClass {
                    testMethod() {
                        return "Hello World!";
                    }
                }
                
                new TestClass().testMethod()`)
        }
    },
};

async function runLangTest(name) {
    const langConfig = langConfigs[name];
    const response = await fetch(`http://127.0.0.1:${langConfig.port}/compile`, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(langConfig.request)
    });

    const responseJson = await response.json();
    console.log(name, responseJson);
    if (responseJson.exceptionText)
        console.log(name, "Exception", responseJson.exceptionText);
}

async function runLangTests() {
    for (const lang of Object.keys(langConfigs))
        runLangTest(lang);
}
//runLangTests();

const layout = new Layout();
console.log(layout);