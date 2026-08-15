# models.dev catalog mirror

DeepAgent Code 构建使用的 [models.dev](https://models.dev) catalog 镜像。

- `api.json` 由 GitHub Actions 每小时从 `https://models.dev/api.json` 同步(结构校验后提交,内容无变化则跳过)。
- `SHA256` 记录当前 `api.json` 的哈希,便于构建审计。
- 本仓库**不包含任何手工快照**:所有数据均来自同步时刻的 models.dev 实时内容。

## 构建侧用法

```bash
# 国内本地构建(多端点 failover 列表,主源仍是 models.dev)
export DEEPAGENT_CODE_MODELS_URL="https://models.dev,https://raw.githubusercontent.com/deepagent-ltd/models.dev/main"
```

构建脚本会依次尝试 `<endpoint>/api.json`,首个成功即采用;全部失败则 fail-closed,不回退任何本地旧快照。

## 同步机制

- Workflow: `.github/workflows/sync.yml`(每小时 cron + 手动触发)
- 校验: `.github/scripts/validate-catalog.mjs`(根对象非空、每个 provider 含 models 对象)
- 上游数据以 MIT 协议开源,见 [anomalyco/models.dev](https://github.com/anomalyco/models.dev)
