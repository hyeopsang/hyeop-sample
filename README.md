# Nettee Sample Code

## Branch 구조

- `main`: 보일러플레이트 제공(corepack ,turborepo, husky, lintstaged, commitlint 등)
- `feature/sample`: 샘플 코드 제공 (기능 동작 확인용, 점진적 개선 예정)

## API & 기능 명세 문서

- [api.md](./api.md)
- [bdd-requirements.md](./bdd-requirements.md)

## 기술 스택

- Node.js >= 20
- PNPM 9.12.3

## 실행 방법

### 1. Corepack 설정

Corepack은 Node.js에 내장된 패키지 매니저 버전 관리 도구입니다.

```bash
# Node.js 20 이상 설치 필요
node -v

# Corepack 활성화
corepack enable

# PNPM 버전 설정
corepack prepare pnpm@9.12.3 --activate
```

### 2. 설치 및 실행

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

#### PNPM 기본 사용법

```bash
# 패키지 설치
pnpm add [패키지명]           # 일반 의존성
pnpm add -D [패키지명]        # 개발 의존성
pnpm add -w [패키지명]        # 워크스페이스 루트에 설치

# 모든 의존성 설치
pnpm install

# 특정 워크스페이스 패키지 실행
pnpm --filter [패키지명] [스크립트]

# 캐시 정리
pnpm store prune

# 패키지 업데이트 확인
pnpm outdated
```

## Git Commit 규칙

커밋 메시지는 다음 타입을 준수해야 합니다

- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅
- refactor: 코드 리팩토링
- test: 테스트 코드
- chore: 기타 변경사항

예시:

```bash
git commit -m "feat: 로그인 기능 추가"
```

## 샘플코드 활용

**시간 여유 및 숙련도에 따라 선택하여 작업**

### 초기 세팅부터 직접 구현(권장)

- 보일러플레이트를 레퍼런스로 활용
- 초기 프로젝트 세팅부터 작업
- 시간적 여유가 있을 경우 추천

### 보일러플레이트 기반 개발

- `main` 브랜치 코드 활용
- 제공된 구조에 맞춘 기능 구현
- 프로젝트에 도움 될 만한 플러그인, 라이브러리 추가하여 보일러플레이트 업그레이드
  - ex) eslint-plugin-simple-import-sort

### 구현된 샘플 코드에서 리팩토링

- **시간이 제한적일 때 권장**
- `feature/sample` 브랜치 기반 개발
- 기존 코드를 리팩토링하며 모노레포 구조에 대한 학습
