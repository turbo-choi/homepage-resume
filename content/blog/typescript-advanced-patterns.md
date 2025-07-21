---
title: 'TypeScript 고급 패턴과 실무 활용법'
description: 'TypeScript의 고급 타입 시스템을 활용한 실무 패턴들을 소개합니다. 제네릭, 유틸리티 타입, 조건부 타입 등을 다룹니다.'
category: 'TypeScript'
tags: ['TypeScript', 'Advanced', 'Patterns', 'Types', 'JavaScript']
publishedAt: '2024-01-10'
readTime: 12
views: 980
emoji: '📘'
gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
---

# TypeScript 고급 패턴과 실무 활용법

TypeScript는 단순히 JavaScript에 타입을 추가한 것 이상의 강력한 기능들을 제공합니다. 이 글에서는 TypeScript의 고급 타입 시스템을 활용하여 더 안전하고 표현력 있는 코드를 작성하는 방법을 알아보겠습니다.

## 1. 제네릭 고급 활용법

### 제약 조건이 있는 제네릭

```typescript
// 기본 제약 조건
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length) // 이제 .length 프로퍼티가 있다는 것을 알 수 있습니다
  return arg
}

// 키 제약 조건
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const person = { name: 'John', age: 30, email: 'john@example.com' }
const name = getProperty(person, 'name') // string 타입
const age = getProperty(person, 'age')   // number 타입
```

### 조건부 제네릭

```typescript
// 조건부 타입을 활용한 제네릭
type ApiResponse<T> = T extends string
  ? { message: T; status: 'success' }
  : T extends Error
  ? { error: T; status: 'error' }
  : { data: T; status: 'success' }

// 사용 예시
type StringResponse = ApiResponse<string>  // { message: string; status: 'success' }
type ErrorResponse = ApiResponse<Error>    // { error: Error; status: 'error' }
type DataResponse = ApiResponse<User[]>    // { data: User[]; status: 'success' }

// 실무 활용 예시
class ApiClient {
  async request<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return { data, status: 'success' } as ApiResponse<T>
    } catch (error) {
      return { error: error as Error, status: 'error' } as ApiResponse<T>
    }
  }
}
```

### 고차 제네릭 함수

```typescript
// 함수 컴포지션을 위한 제네릭
type Fn<A, B> = (a: A) => B

function compose<A, B, C>(
  f: Fn<B, C>,
  g: Fn<A, B>
): Fn<A, C> {
  return (a: A) => f(g(a))
}

// 파이프 함수
function pipe<A>(value: A): A
function pipe<A, B>(value: A, fn1: Fn<A, B>): B
function pipe<A, B, C>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>): C
function pipe<A, B, C, D>(
  value: A,
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D>
): D
function pipe(value: any, ...fns: Fn<any, any>[]): any {
  return fns.reduce((acc, fn) => fn(acc), value)
}

// 사용 예시
const addOne = (x: number) => x + 1
const toString = (x: number) => x.toString()
const addExclamation = (x: string) => x + '!'

const result = pipe(5, addOne, toString, addExclamation) // "6!"
```

## 2. 유틸리티 타입 마스터하기

### 내장 유틸리티 타입 활용

```typescript
interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

// Partial - 모든 프로퍼티를 선택적으로
type UserUpdate = Partial<User>

// Pick - 특정 프로퍼티만 선택
type UserPublic = Pick<User, 'id' | 'name' | 'email'>

// Omit - 특정 프로퍼티 제외
type UserCreate = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

// Required - 모든 프로퍼티를 필수로
type UserRequired = Required<UserUpdate>

// Record - 키-값 쌍 타입 생성
type UserRoles = Record<'admin' | 'user' | 'guest', string[]>

const roles: UserRoles = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
}
```

### 커스텀 유틸리티 타입

```typescript
// 깊은 Partial 타입
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// 깊은 Required 타입
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

// 특정 타입의 키만 추출
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

interface Example {
  a: string
  b: number
  c: boolean
  d: string
}

type StringKeys = KeysOfType<Example, string> // 'a' | 'd'

// 함수 타입에서 매개변수 추출
type GetParameters<T> = T extends (...args: infer P) => any ? P : never

type ExampleFn = (a: string, b: number) => boolean
type Params = GetParameters<ExampleFn> // [string, number]
```

## 3. 조건부 타입과 템플릿 리터럴

### 고급 조건부 타입

```typescript
// 배열인지 확인하는 타입
type IsArray<T> = T extends readonly any[] ? true : false

type Test1 = IsArray<string[]>  // true
type Test2 = IsArray<string>    // false

// 함수의 반환 타입 추출
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

// Promise의 내부 타입 추출
type Awaited<T> = T extends Promise<infer U> ? U : T

type PromiseString = Promise<string>
type UnwrappedString = Awaited<PromiseString> // string

// 재귀적 조건부 타입
type Flatten<T> = T extends readonly (infer U)[]
  ? U extends readonly any[]
    ? Flatten<U>
    : U
  : T

type Nested = string[][][][]
type Flattened = Flatten<Nested> // string
```

### 템플릿 리터럴 타입

```typescript
// 문자열 조작 타입
type Uppercase<S extends string> = intrinsic
type Lowercase<S extends string> = intrinsic
type Capitalize<S extends string> = intrinsic
type Uncapitalize<S extends string> = intrinsic

// 경로 생성 타입
type Route<T extends string> = `/${T}`
type ApiRoute<T extends string> = `/api/${T}`

type UserRoute = Route<'users'>        // "/users"
type UserApiRoute = ApiRoute<'users'>  // "/api/users"

// 이벤트 핸들러 타입
type EventHandler<T extends string> = `on${Capitalize<T>}`

type ClickHandler = EventHandler<'click'>  // "onClick"
type HoverHandler = EventHandler<'hover'>  // "onHover"

// CSS 속성 타입
type CSSProperty = 
  | 'color'
  | 'background-color'
  | 'font-size'
  | 'margin'
  | 'padding'

type CSSValue<T extends CSSProperty> = T extends 'color' | 'background-color'
  ? `#${string}` | `rgb(${number}, ${number}, ${number})`
  : T extends 'font-size'
  ? `${number}px` | `${number}rem` | `${number}em`
  : string

const styles: Record<CSSProperty, CSSValue<CSSProperty>> = {
  'color': '#ff0000',
  'background-color': 'rgb(255, 255, 255)',
  'font-size': '16px',
  'margin': '10px',
  'padding': '5px'
}
```

## 4. 고급 클래스 패턴

### 추상 클래스와 제네릭

```typescript
// 추상 기본 클래스
abstract class Repository<T, ID> {
  abstract findById(id: ID): Promise<T | null>
  abstract save(entity: T): Promise<T>
  abstract delete(id: ID): Promise<void>
  abstract findAll(): Promise<T[]>
  
  // 공통 메서드
  async exists(id: ID): Promise<boolean> {
    const entity = await this.findById(id)
    return entity !== null
  }
}

// 구체적인 구현
class UserRepository extends Repository<User, number> {
  async findById(id: number): Promise<User | null> {
    // 데이터베이스 조회 로직
    return null // 예시
  }
  
  async save(user: User): Promise<User> {
    // 저장 로직
    return user
  }
  
  async delete(id: number): Promise<void> {
    // 삭제 로직
  }
  
  async findAll(): Promise<User[]> {
    // 전체 조회 로직
    return []
  }
  
  // 사용자 특화 메서드
  async findByEmail(email: string): Promise<User | null> {
    // 이메일로 사용자 찾기
    return null
  }
}
```

### 믹스인 패턴

```typescript
// 믹스인 타입 정의
type Constructor<T = {}> = new (...args: any[]) => T

// 타임스탬프 믹스인
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date()
    updatedAt = new Date()
    
    updateTimestamp() {
      this.updatedAt = new Date()
    }
  }
}

// 활성화 상태 믹스인
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActive = true
    
    activate() {
      this.isActive = true
    }
    
    deactivate() {
      this.isActive = false
    }
  }
}

// 기본 클래스
class User {
  constructor(public name: string, public email: string) {}
}

// 믹스인 적용
const TimestampedUser = Timestamped(User)
const ActivatableUser = Activatable(TimestampedUser)

const user = new ActivatableUser('John', 'john@example.com')
user.activate()
user.updateTimestamp()
```

## 5. 타입 가드와 타입 단언

### 사용자 정의 타입 가드

```typescript
// 기본 타입 가드
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

// 객체 타입 가드
interface Dog {
  breed: string
  bark(): void
}

interface Cat {
  breed: string
  meow(): void
}

function isDog(animal: Dog | Cat): animal is Dog {
  return 'bark' in animal
}

function makeSound(animal: Dog | Cat) {
  if (isDog(animal)) {
    animal.bark() // TypeScript가 animal을 Dog로 인식
  } else {
    animal.meow() // TypeScript가 animal을 Cat으로 인식
  }
}

// 제네릭 타입 가드
function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(guard)
}

const stringArray = ['a', 'b', 'c']
if (isArrayOf(stringArray, isString)) {
  // stringArray는 이제 string[] 타입
  console.log(stringArray.map(s => s.toUpperCase()))
}
```

### 어설션 함수

```typescript
// 어설션 함수
function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Expected number')
  }
}

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected string')
  }
}

// 사용 예시
function processValue(value: unknown) {
  assertIsNumber(value)
  // 이 시점에서 value는 number 타입
  console.log(value.toFixed(2))
}

// 제네릭 어설션 함수
function assertType<T>(
  value: unknown,
  guard: (value: unknown) => value is T
): asserts value is T {
  if (!guard(value)) {
    throw new Error('Type assertion failed')
  }
}
```

## 6. 실무 활용 패턴

### API 응답 타입 관리

```typescript
// API 응답 기본 구조
interface ApiResponse<T> {
  data: T
  message: string
  status: number
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// API 엔드포인트 타입 정의
interface ApiEndpoints {
  '/users': {
    GET: ApiResponse<User[]>
    POST: ApiResponse<User>
  }
  '/users/:id': {
    GET: ApiResponse<User>
    PUT: ApiResponse<User>
    DELETE: ApiResponse<void>
  }
  '/posts': {
    GET: PaginatedResponse<Post>
    POST: ApiResponse<Post>
  }
}

// 타입 안전한 API 클라이언트
class TypedApiClient {
  async get<K extends keyof ApiEndpoints>(
    endpoint: K
  ): Promise<ApiEndpoints[K]['GET']> {
    const response = await fetch(endpoint as string)
    return response.json()
  }
  
  async post<K extends keyof ApiEndpoints>(
    endpoint: K,
    data: any
  ): Promise<ApiEndpoints[K]['POST']> {
    const response = await fetch(endpoint as string, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.json()
  }
}
```

### 상태 관리 타입 패턴

```typescript
// 상태 타입 정의
interface AppState {
  user: UserState
  posts: PostState
  ui: UIState
}

interface UserState {
  currentUser: User | null
  isLoading: boolean
  error: string | null
}

// 액션 타입 정의
type UserAction =
  | { type: 'USER_LOADING' }
  | { type: 'USER_SUCCESS'; payload: User }
  | { type: 'USER_ERROR'; payload: string }
  | { type: 'USER_LOGOUT' }

// 리듀서 타입
type Reducer<S, A> = (state: S, action: A) => S

const userReducer: Reducer<UserState, UserAction> = (state, action) => {
  switch (action.type) {
    case 'USER_LOADING':
      return { ...state, isLoading: true, error: null }
    case 'USER_SUCCESS':
      return { ...state, isLoading: false, currentUser: action.payload }
    case 'USER_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    case 'USER_LOGOUT':
      return { ...state, currentUser: null }
    default:
      return state
  }
}
```

## 결론

TypeScript의 고급 기능들을 활용하면 더 안전하고 표현력 있는 코드를 작성할 수 있습니다. 중요한 것은 이러한 기능들을 적절히 활용하여 코드의 가독성과 유지보수성을 높이는 것입니다.

실무에서는 다음과 같은 원칙을 따르는 것이 좋습니다:

1. **점진적 적용**: 복잡한 타입부터 시작하지 말고, 기본적인 타입부터 점진적으로 적용
2. **가독성 우선**: 타입이 너무 복잡해지면 코드 가독성이 떨어질 수 있음
3. **팀 컨벤션**: 팀 내에서 일관된 타입 사용 규칙 정립
4. **문서화**: 복잡한 타입에 대한 적절한 주석과 문서화

TypeScript의 타입 시스템을 마스터하면 런타임 에러를 크게 줄이고, 더 안정적인 애플리케이션을 개발할 수 있습니다.