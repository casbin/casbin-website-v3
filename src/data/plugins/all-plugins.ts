// Auto-generated file - do not edit manually
// Generated from v2 data on 2026-01-11T16:50:59.657Z

export interface Plugin {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  type?: string;
  autoSave?: string;
  author?: string;
}

export const allPlugins: Plugin[] = [
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    tags: ["Go", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Filtered File Adapter (built-in)](/docs/policy-subset-loading)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files with policy subset loading support",
    tags: ["Go", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "[@faceless-saint](https://github.com/faceless-saint)",
  },
  {
    title: "[SQL Adapter](https://github.com/Blank-Xu/sql-adapter)",
    description:
      "MySQL, PostgreSQL, SQL Server, SQLite3 are supported in `master` branch and Oracle is supported in `oracle` branch by `database/sql`",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "SQL",
    autoSave: "✅",
    author: "[@Blank-Xu](https://github.com/Blank-Xu)",
  },
  {
    title: "[Xorm Adapter](https://github.com/casbin/xorm-adapter)",
    description:
      "MySQL, PostgreSQL, TiDB, SQLite, SQL Server, Oracle are supported by [Xorm](https://github.com/go-xorm/xorm/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[GORM Adapter](https://github.com/casbin/gorm-adapter)",
    description:
      "MySQL, PostgreSQL, Sqlite3, SQL Server are supported by [GORM](https://github.com/go-gorm/gorm)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[GORM Adapter Ex](https://github.com/casbin/gorm-adapter-ex)",
    description:
      "MySQL, PostgreSQL, Sqlite3, SQL Server are supported by [GORM](https://github.com/go-gorm/gorm)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Ent Adapter](https://github.com/casbin/ent-adapter)",
    description:
      "MySQL, MariaDB, PostgreSQL, SQLite, Gremlin-based graph databases are supported by [ent ORM](https://entgo.io/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Beego ORM Adapter](https://github.com/casbin/beego-orm-adapter)",
    description:
      "MySQL, PostgreSQL, Sqlite3 are supported by [Beego ORM](https://beego.wiki/docs/mvc/model/overview/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[SQLX Adapter](https://github.com/memwey/casbin-sqlx-adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, Oracle are supported by [SQLX](https://github.com/jmoiron/sqlx)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@memwey](https://github.com/memwey)",
  },
  {
    title: "[Sqlx Adapter](https://github.com/Blank-Xu/sqlx-adapter)",
    description:
      "MySQL, PostgreSQL, SQL Server, SQLite3 are supported in `master` branch and Oracle is supported in `oracle` branch by [sqlx](https://github.com/jmoiron/sqlx)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@Blank-Xu](https://github.com/Blank-Xu)",
  },
  {
    title: "[GF ORM Adapter](https://github.com/vance-liu/gdb-adapter)",
    description:
      "MySQL, SQLite, PostgreSQL, Oracle, SQL Server are supported by [GoFrame ORM](https://github.com/gogf/gf/tree/master/contrib/drivers)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@vance-liu](https://github.com/vance-liu)",
  },
  {
    title: "[GoFrame ORM Adapter](https://github.com/kotlin2018/adapter)",
    description:
      "MySQL, SQLite, PostgreSQL, Oracle, SQL Server are supported by [GoFrame ORM](https://github.com/gogf/gf/tree/master/contrib/drivers)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@kotlin2018](https://github.com/kotlin2018)",
  },
  {
    title: "[gf-adapter](https://github.com/zcyc/gf-adapter)",
    description:
      "MySQL, SQLite, PostgreSQL, Oracle, SQL Server are supported by [GoFrame ORM](https://github.com/gogf/gf/tree/master/contrib/drivers)",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@zcyc](https://github.com/zcyc)",
  },
  {
    title: "[Gdb Adapter](https://github.com/jxo-me/gdb-adapter)",
    description:
      "MySQL, SQLite, PostgreSQL, Oracle, SQL Server are supported by [GoFrame ORM](https://github.com/gogf/gf/tree/master/contrib/drivers)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@jxo-me](https://github.com/jxo-me)",
  },
  {
    title: "[GoFrame V2 Adapter](https://github.com/hailaz/gf-casbin-adapter)",
    description:
      "MySQL, SQLite, PostgreSQL, Oracle, SQL Server are supported by [GoFrame ORM](https://goframe.org/pages/viewpage.action?pageId=1114686)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@hailaz](https://github.com/hailaz)",
  },
  {
    title: "[Bun Adapter](https://github.com/JunNishimura/casbin-bun-adapter)",
    description:
      "MySQL, SQLite, PostgreSQL, SQL Server are supported by [Bun ORM](https://bun.uptrace.dev/guide/drivers.html)",
    tags: ["Go", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@JunNishimura](https://github.com/JunNishimura)",
  },
  {
    title: "[Filtered PostgreSQL Adapter](https://github.com/casbin/casbin-pg-adapter)",
    description: "For [PostgreSQL](https://www.postgresql.org/)",
    image: "/images/ecosystem/postgreSQL.png",
    tags: ["Go", "Adapter"],
    type: "SQL",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Filtered pgx Adapter](https://github.com/pckhoi/casbin-pgx-adapter)",
    description: "PostgreSQL is supported by [pgx](https://github.com/jackc/pgx)",
    image: "/images/ecosystem/postgreSQL.png",
    tags: ["Go", "Adapter"],
    type: "SQL",
    autoSave: "✅",
    author: "[@pckhoi](https://github.com/pckhoi)",
  },
  {
    title: "[casbin-pgx-adapter](https://github.com/noho-digital/casbin-pgx-adapter)",
    description:
      "A PostgreSQL adapter for Casbin using the [pgx](https://github.com/jackc/pgx) driver.",
    image: "/images/ecosystem/postgreSQL.png",
    tags: ["Go", "Adapter"],
    type: "SQL",
    autoSave: "✅",
    author: "[@noho-digital](https://github.com/noho-digital)",
  },
  {
    title: "[Pgx Adapter](https://github.com/gtoxlili/pgx-adapter)",
    description:
      "PostgreSQL is supported by [pgx](https://github.com/jackc/pgx), supports customizable column count",
    image: "/images/ecosystem/postgreSQL.png",
    tags: ["Go", "Adapter"],
    type: "SQL",
    autoSave: "✅",
    author: "[@gtoxlili](https://github.com/gtoxlili)",
  },
  {
    title: "[PostgreSQL Adapter](https://github.com/cychiuae/casbin-pg-adapter)",
    description: "For [PostgreSQL](https://www.postgresql.org/)",
    image: "/images/ecosystem/postgreSQL.png",
    tags: ["Go", "Adapter"],
    type: "SQL",
    autoSave: "✅",
    author: "[@cychiuae](https://github.com/cychiuae)",
  },
  {
    title: "[RQLite Adapter](https://github.com/edomosystems/rqlite-adapter)",
    description: "For [RQLite](https://github.com/rqlite/rqlite/)",
    image: "/images/ecosystem/rqlite.png",
    tags: ["Go", "Adapter"],
    type: "SQL",
    autoSave: "✅",
    author: "[EDOMO Systems](https://github.com/edomosystems)",
  },
  {
    title: "[MongoDB Adapter](https://github.com/casbin/mongodb-adapter)",
    description:
      "For [MongoDB](https://www.mongodb.com) based on [MongoDB Go Driver](https://github.com/mongodb/mongo-go-driver)",
    image: "/images/ecosystem/monogoDB.png",
    tags: ["Go", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[RethinkDB Adapter](https://github.com/adityapandey9/rethinkdb-adapter)",
    description: "For [RethinkDB](https://rethinkdb.com/)",
    image: "/images/ecosystem/rethinkDB.png",
    tags: ["Go", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[@adityapandey9](https://github.com/adityapandey9)",
  },
  {
    title: "[Cassandra Adapter](https://github.com/casbin/cassandra-adapter)",
    description: "For [Apache Cassandra DB](http://cassandra.apache.org)",
    image: "/images/ecosystem/cassandra.png",
    tags: ["Go", "Adapter"],
    type: "NoSQL",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[DynamoDB Adapter](https://github.com/HOOQTV/dynacasbin)",
    description: "For [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)",
    image: "/images/ecosystem/dynamoDB.png",
    tags: ["Go", "Adapter"],
    type: "NoSQL",
    autoSave: "❌",
    author: "[HOOQ](https://github.com/HOOQTV)",
  },
  {
    title: "[Dynacasbin](https://github.com/NewbMiao/dynacasbin)",
    description: "For [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)",
    image: "/images/ecosystem/dynamoDB.png",
    tags: ["Go", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[NewbMiao](https://github.com/NewbMiao)",
  },
  {
    title: "[ArangoDB Adapter](https://github.com/adamwasila/arangodb-adapter)",
    description: "For [ArangoDB](https://www.arangodb.com/)",
    image: "/images/ecosystem/arangoDB.png",
    tags: ["Go", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[@adamwasila](https://github.com/adamwasila)",
  },
  {
    title: "[Amazon S3 Adapter](https://github.com/Soluto/casbin-minio-adapter)",
    description:
      "For [Minio](https://github.com/minio/minio) and [Amazon S3](https://aws.amazon.com/s3/)",
    image: "/images/ecosystem/amazonS3.png",
    tags: ["Go", "Adapter"],
    type: "Cloud",
    autoSave: "❌",
    author: "[Soluto](https://github.com/Soluto)",
  },
  {
    title: "[Go CDK Adapter](https://github.com/bartventer/casbin-go-cloud-adapter)",
    description:
      "Adapter based on [Go Cloud Dev Kit](https://gocloud.dev/) that supports: Amazon DynamoDB, Azure CosmosDB, GCP Firestore, MongoDB, In-Memory",
    image: "/images/ecosystem/DB.png",
    tags: ["Go", "Adapter"],
    type: "Cloud",
    autoSave: "✅",
    author: "[@bartventer](https://github.com/bartventer)",
  },
  {
    title: "[Azure Cosmos DB Adapter](https://github.com/spacycoder/cosmos-casbin-adapter)",
    description:
      "For [Microsoft Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction)",
    image: "/images/ecosystem/cosmosDB.png",
    tags: ["Go", "Adapter"],
    type: "Cloud",
    autoSave: "✅",
    author: "[@spacycoder](https://github.com/spacycoder)",
  },
  {
    title: "[GCP Firestore Adapter](https://github.com/reedom/casbin-firestore-adapter)",
    description: "For [Google Cloud Platform Firestore](https://cloud.google.com/firestore/)",
    image: "/images/ecosystem/firestore.jpeg",
    tags: ["Go", "Adapter"],
    type: "Cloud",
    autoSave: "❌",
    author: "[@reedom](https://github.com/reedom)",
  },
  {
    title: "[GCP Cloud Storage Adapter](https://github.com/qurami/casbin-cloud-storage-adapter)",
    description: "For [Google Cloud Platform Cloud Storage](https://cloud.google.com/storage/)",
    image: "/images/ecosystem/googleCloudStorage.png",
    tags: ["Go", "Adapter"],
    type: "Cloud",
    autoSave: "❌",
    author: "[qurami](https://github.com/qurami)",
  },
  {
    title:
      "[GCP Cloud Spanner Adapter](https://github.com/flowerinthenight/casbin-spanner-adapter)",
    description: "For [Google Cloud Platform Cloud Spanner](https://cloud.google.com/spanner/)",
    image: "/images/ecosystem/spanner.png",
    tags: ["Go", "Adapter"],
    type: "Cloud",
    autoSave: "✅",
    author: "[@flowerinthenight](https://github.com/flowerinthenight)",
  },
  {
    title: "[Consul Adapter](https://github.com/ankitm123/consul-adapter)",
    description: "For [HashiCorp Consul](https://www.consul.io/)",
    image: "/images/ecosystem/firestore.jpeg",
    tags: ["Go", "Adapter"],
    type: "KV store",
    autoSave: "❌",
    author: "[@ankitm123](https://github.com/ankitm123)",
  },
  {
    title: "[Redis Adapter (Redigo)](https://github.com/casbin/redis-adapter)",
    description: "For [Redis](https://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Go", "Adapter"],
    type: "KV store",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Redis Adapter (go-redis)](https://github.com/mlsen/casbin-redis-adapter)",
    description: "For [Redis](https://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Go", "Adapter"],
    type: "KV store",
    autoSave: "✅",
    author: "[@mlsen](https://github.com/mlsen)",
  },
  {
    title: "[Etcd Adapter](https://github.com/sebastianliu/etcd-adapter)",
    description: "For [etcd](https://github.com/coreos/etcd)",
    image: "/images/ecosystem/etcd.png",
    tags: ["Go", "Adapter"],
    type: "KV store",
    autoSave: "❌",
    author: "[@sebastianliu](https://github.com/sebastianliu)",
  },
  {
    title: "[BoltDB Adapter](https://github.com/speza/casbin-bolt-adapter)",
    description: "For [Bolt](https://github.com/boltdb/bolt)",
    image: "/images/ecosystem/bolt.png",
    tags: ["Go", "Adapter"],
    type: "KV store",
    autoSave: "✅",
    author: "[@speza](https://github.com/speza)",
  },
  {
    title: "[Bolt Adapter](https://github.com/wirepair/bolt-adapter)",
    description: "For [Bolt](https://github.com/boltdb/bolt)",
    image: "/images/ecosystem/bolt.png",
    tags: ["Go", "Adapter"],
    type: "KV store",
    autoSave: "❌",
    author: "[@wirepair](https://github.com/wirepair)",
  },
  {
    title: "[BadgerDB Adapter](https://github.com/inits/casbin-badgerdb-adapter)",
    description: "For [BadgerDB](https://github.com/dgraph-io/badger)",
    image: "/images/ecosystem/badger.png",
    tags: ["Go", "Adapter"],
    type: "KV store",
    autoSave: "✅",
    author: "[@inits](https://github.com/inits)",
  },
  {
    title: "[Protobuf Adapter](https://github.com/casbin/protobuf-adapter)",
    description: "For [Google Protocol Buffers](https://developers.google.com/protocol-buffers/)",
    image: "/images/ecosystem/protobuf.png",
    tags: ["Go", "Adapter"],
    type: "Stream",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[JSON Adapter](https://github.com/casbin/json-adapter)",
    description: "For [JSON](https://www.json.org/)",
    image: "/images/ecosystem/json.png",
    tags: ["Go", "Adapter"],
    type: "String",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[String Adapter](https://github.com/qiangmzsx/string-adapter)",
    description: "For String",
    image: "/images/ecosystem/string.png",
    tags: ["Go", "Adapter"],
    type: "String",
    autoSave: "❌",
    author: "[@qiangmzsx](https://github.com/qiangmzsx)",
  },
  {
    title: "[HTTP File Adapter](https://github.com/h4ckedneko/casbin-httpfs)",
    description: "For [http.FileSystem](https://golang.org/src/net/http/fs.go)",
    image: "/images/ecosystem/http.png",
    tags: ["Go", "Adapter"],
    type: "HTTP",
    autoSave: "❌",
    author: "[@h4ckedneko](https://github.com/h4ckedneko)",
  },
  {
    title: "[FileSystem Adapter](https://github.com/naucon/casbin-fs-adapter)",
    description: "For [fs.FS](https://pkg.go.dev/io/fs) and [embed.FS](https://pkg.go.dev/embed)",
    image: "/images/ecosystem/file.png",
    tags: ["Go", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "[@naucon](https://github.com/naucon)",
  },
  {
    title: "[NATS JetStream Adapter](https://github.com/grepplabs/casbin-jetstream)",
    description: "For [NATS JetStream](https://docs.nats.io/nats-concepts/jetstream)",
    image: "/images/ecosystem/nats.png",
    tags: ["Go", "Adapter"],
    type: "KV store",
    autoSave: "✅",
    author: "[grepplabs](https://github.com/grepplabs)",
  },
  {
    title: "[Kubernetes Adapter](https://github.com/grepplabs/casbin-kube)",
    description: "For [Kubernetes](https://kubernetes.io)",
    image: "/images/ecosystem/kubernetes.png",
    tags: ["Go", "Adapter"],
    type: "Cloud",
    autoSave: "✅",
    author: "[grepplabs](https://github.com/grepplabs)",
  },
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/images/ecosystem/file.png",
    tags: ["Node.js", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Filtered File Adapter (built-in)](/docs/policy-subset-loading)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files with policy subset loading support",
    image: "/images/ecosystem/file.png",
    tags: ["Node.js", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title:
      "[String Adapter (built-in)](https://github.com/casbin/node-casbin/blob/master/src/persist/stringAdapter.ts)",
    description: "For String",
    image: "/images/ecosystem/string.png",
    tags: ["Node.js", "Adapter"],
    type: "String",
    autoSave: "❌",
    author: "[@calebfaruki](https://github.com/calebfaruki)",
  },
  {
    title: "[Basic Adapter](https://github.com/node-casbin/basic-adapter)",
    description: "pg, mysql, mysql2, sqlite3, oracledb, mssql are supported by the adapter itself",
    image: "/images/ecosystem/SQL.png",
    tags: ["Node.js", "Adapter"],
    type: "Native ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Sequelize Adapter](https://github.com/node-casbin/sequelize-adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, Microsoft SQL Server are supported by [Sequelize](https://github.com/sequelize/sequelize)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Node.js", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[TypeORM Adapter](https://github.com/node-casbin/typeorm-adapter)",
    description:
      "MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL, MongoDB are supported by [TypeORM](https://github.com/typeorm/typeorm)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Node.js", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Prisma Adapter](https://github.com/node-casbin/prisma-adapter)",
    description:
      "MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, AWS Aurora, Azure SQL are supported by [Prisma](https://www.prisma.io/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Node.js", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Drizzle Adapter](https://github.com/node-casbin/drizzle-adapter)",
    description:
      "PostgreSQL, MySQL, SQLite, Turso, Neon, PlanetScale, Vercel Postgres, Xata are supported by [Drizzle ORM](https://orm.drizzle.team/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Node.js", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Knex Adapter](https://github.com/knex/casbin-knex-adapter)",
    description:
      "MSSQL, MySQL, PostgreSQL, SQLite3, Oracle are supported by [Knex.js](https://knexjs.org/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Node.js", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[knex](https://github.com/knex)",
  },
  {
    title: "[Objection.js Adapter](https://github.com/willsoto/casbin-objection-adapter)",
    description:
      "MSSQL, MySQL, PostgreSQL, SQLite3, Oracle are supported by [Objection.js](https://vincit.github.io/objection.js/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Node.js", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@willsoto](https://github.com/willsoto)",
  },
  {
    title: "[MikroORM Adapter](https://github.com/baisheng/casbin-mikroorm-adapter)",
    description:
      "MongoDB, MySQL, MariaDB, PostgreSQL, SQLite are supported by [MikroORM](https://mikro-orm.io/)",
    tags: ["Node.js", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@baisheng](https://github.com/baisheng)",
  },
  {
    title: "[Node PostgreSQL Native Adapter](https://github.com/touchifyapp/casbin-pg-adapter)",
    description:
      "PostgreSQL adapter with advanced policy subset loading support and improved performances built with [node-postgres](https://node-postgres.com/).",
    tags: ["Node.js", "Adapter"],
    type: "SQL",
    autoSave: "✅",
    author: "[@touchifyapp](https://github.com/touchifyapp)",
  },
  {
    title: "[Mongoose Adapter](https://github.com/node-casbin/mongoose-adapter)",
    description: "MongoDB is supported by [Mongoose](https://mongoosejs.com/)",
    tags: ["Node.js", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[elastic.io](https://github.com/elasticio) and Casbin",
  },
  {
    title:
      "[Mongoose Adapter (No-Transaction)](https://github.com/minhducck/casbin-mongoose-adapter)",
    description: "MongoDB is supported by [Mongoose](https://mongoosejs.com/)",
    tags: ["Node.js", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[minhducck](https://github.com/minhducck)",
  },
  {
    title: "[Node MongoDB Native Adapter](https://github.com/NathanBhanji/mongodb-casbin-adapter)",
    description: "For [Node MongoDB Native](https://mongodb.github.io/node-mongodb-native/)",
    tags: ["Node.js", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[NathanBhanji](https://github.com/NathanBhanji)",
  },
  {
    title: "[Node MongoDB Native Adapter](https://github.com/juicycleff/casbin-mongodb-adapter)",
    description: "For [Node MongoDB Native](https://mongodb.github.io/node-mongodb-native/)",
    tags: ["Node.js", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[@juicycleff](https://github.com/juicycleff)",
  },
  {
    title: "[DynamoDB Adapter](https://github.com/fospitia/casbin-dynamodb-adapter)",
    description: "For [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)",
    tags: ["Node.js", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[@fospitia](https://github.com/fospitia)",
  },
  {
    title: "[Couchbase Adapter](https://github.com/MarkMYoung/casbin-couchbase-adapter)",
    description: "For [Couchbase](https://www.couchbase.com/)",
    tags: ["Node.js", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[@MarkMYoung](https://github.com/MarkMYoung)",
  },
  {
    title: "[Redis Adapter](https://github.com/node-casbin/redis-adapter)",
    description: "For [Redis](https://redis.io/)",
    tags: ["Node.js", "Adapter"],
    type: "KV store",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Redis Adapter](https://github.com/NandaKishorJeripothula/node-casbin-redis-adapter)",
    description: "For [Redis](https://redis.io/)",
    tags: ["Node.js", "Adapter"],
    type: "KV store",
    autoSave: "❌",
    author: "[@NandaKishorJeripothula](https://github.com/NandaKishorJeripothula)",
  },
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/images/ecosystem/file.png",
    tags: ["Python", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Django ORM Adapter](https://github.com/officialpycasbin/django-orm-adapter)",
    description:
      "PostgreSQL, MariaDB, MySQL, Oracle, SQLite, IBM DB2, Microsoft SQL Server, Firebird, ODBC are supported by [Django ORM](https://docs.djangoproject.com/en/3.0/ref/databases/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[SQLObject Adapter](https://github.com/officialpycasbin/sqlobject-adapter)",
    description:
      "PostgreSQL, MySQL, SQLite, Microsoft SQL Server, Firebird, Sybase, MAX DB, pyfirebirdsql are supported by [SQLObject](http://www.sqlobject.org/index.html)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[SQLAlchemy Adapter](https://github.com/officialpycasbin/sqlalchemy-adapter)",
    description:
      "PostgreSQL, MySQL, SQLite, Oracle, Microsoft SQL Server, Firebird, Sybase are supported by [SQLAlchemy](https://www.sqlalchemy.org/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title:
      "[Async SQLAlchemy Adapter](https://github.com/officialpycasbin/async-sqlalchemy-adapter)",
    description:
      "PostgreSQL, MySQL, SQLite, Oracle, Microsoft SQL Server, Firebird, Sybase are supported by [SQLAlchemy](https://www.sqlalchemy.org/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title:
      "[Async Databases Adapter](https://github.com/officialpycasbin/casbin-databases-adapter)",
    description:
      "PostgreSQL, MySQL, SQLite, Oracle, Microsoft SQL Server, Firebird, Sybase are supported by [Databases](https://www.encode.io/databases/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Peewee Adapter](https://github.com/shblhy/peewee-adapter)",
    description: "PostgreSQL, MySQL, SQLite are supported by [Peewee](http://docs.peewee-orm.com/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@shblhy](https://github.com/shblhy)",
  },
  {
    title: "[MongoEngine Adapter](https://github.com/zhangbailong945/mongoengine_adapter)",
    description: "MongoDB is supported by [MongoEngine](http://mongoengine.org/)",
    image: "/images/ecosystem/monogoEngine.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "❌",
    author: "[@zhangbailong945](https://github.com/zhangbailong945)",
  },
  {
    title: "[Pony ORM Adapter](https://github.com/drorvinkler/pycasbin-pony-adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, Oracle, CockroachDB are supported by [Pony ORM](https://ponyorm.org/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@drorvinkler](https://github.com/drorvinkler)",
  },
  {
    title: "[Tortoise ORM Adapter](https://github.com/thearchitector/casbin-tortoise-adapter)",
    description:
      "PostgreSQL (>=9.4), MySQL, MariaDB, and SQLite are supported by [Tortoise ORM](https://tortoise.github.io/databases.html)",
    image: "/images/ecosystem/postgreSQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@thearchitector](https://github.com/thearchitector)",
  },
  {
    title: "[Async Ormar Adapter](https://github.com/shepilov-vladislav/ormar-casbin-adapter)",
    description:
      "PostgreSQL, MySQL, SQLite are supported by [Ormar](https://github.com/collerek/ormar/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@shepilov-vladislav](https://github.com/shepilov-vladislav)",
  },
  {
    title:
      "[SQLModel Adapter](https://github.com/shepilov-vladislav/async-casbin-sqlmodel-adapter)",
    description:
      "PostgreSQL, MySQL, SQLite are supported by [SQLModel](https://github.com/tiangolo/sqlmodel)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Python", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@shepilov-vladislav](https://github.com/shepilov-vladislav)",
  },
  {
    title: "[Couchbase Adapter](https://github.com/ScienceLogic/casbin-couchbase-adapter)",
    description: "For [Couchbase](https://www.couchbase.com/)",
    image: "/images/ecosystem/couchBase.png",
    tags: ["Python", "Adapter"],
    type: "NoSQL",
    autoSave: "✅ (without `remove_filtered_policy()`)",
    author: "[ScienceLogic](https://github.com/ScienceLogic)",
  },
  {
    title: "[DynamoDB Adapter](https://github.com/abqadeer/python-dycasbin)",
    description: "For [DynamoDB](https://aws.amazon.com/dynamodb/)",
    image: "/images/ecosystem/dynamoDB.png",
    tags: ["Python", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[@abqadeer](https://github.com/abqadeer/)",
  },
  {
    title: "[Pymongo Adapter](https://github.com/officialpycasbin/pymongo-adapter)",
    description: "MongoDB is supported by [Pymongo](https://pypi.org/project/pymongo/)",
    image: "/images/ecosystem/monogoDB.png",
    tags: ["Python", "Adapter"],
    type: "NoSQL",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Redis Adapter](https://github.com/officialpycasbin/redis-adapter)",
    description: "For [Redis](https://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Python", "Adapter"],
    type: "KV store",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[GCP Firebase Adapter](https://github.com/devrushi41/pycasbin-firebase-adapter)",
    description: "For [Google Cloud Platform Firebase](https://firebase.google.com/)",
    image: "/images/ecosystem/firestore.jpeg",
    tags: ["Python", "Adapter"],
    type: "Cloud",
    autoSave: "✅",
    author: "[@devrushi41](https://github.com/devrushi41)",
  },
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/images/ecosystem/file.png",
    tags: ["Java", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[JDBC Adapter](https://github.com/jcasbin/jdbc-adapter)",
    description:
      "MySQL, Oracle, PostgreSQL, DB2, Sybase, SQL Server are supported by [JDBC](https://docs.oracle.com/cd/E19226-01/820-7688/gawms/index.html)",
    image: "/images/ecosystem/JDBC.png",
    tags: ["Java", "Adapter"],
    type: "JDBC",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Hibernate Adapter](https://github.com/jcasbin/hibernate-adapter)",
    description:
      "Oracle, DB2, SQL Server, Sybase, MySQL, PostgreSQL are supported by [Hibernate](http://www.hibernate.org/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Java", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[MyBatis Adapter](https://github.com/jcasbin/mybatis-adapter)",
    description:
      "MySQL, Oracle, PostgreSQL, DB2, Sybase, SQL Server (the same as JDBC) are supported by [MyBatis 3](https://mybatis.org/mybatis-3/)",
    image: "/images/ecosystem/mybatis.jpeg",
    tags: ["Java", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Hutool Adapter](https://github.com/mapleafgo/jcasbin-extra)",
    description:
      "MySQL, Oracle, PostgreSQL, SQLite are supported by [Hutool](https://github.com/looly/hutool)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Java", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@mapleafgo](https://github.com/mapleafgo)",
  },
  {
    title: "[MongoDB Adapter](https://github.com/jcasbin/jcasbin-mongo-adapter)",
    description:
      "MongoDB is supported by [mongodb-driver-sync](https://mongodb.github.io/mongo-java-driver/)",
    image: "/images/ecosystem/monogoDB.png",
    tags: ["Java", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[DynamoDB Adapter](https://github.com/jcasbin/dynamodb-adapter)",
    description: "For [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)",
    image: "/images/ecosystem/dynamoDB.png",
    tags: ["Java", "Adapter"],
    type: "NoSQL",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Redis Adapter](https://github.com/jcasbin/redis-adapter)",
    description: "For [Redis](https://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Java", "Adapter"],
    type: "KV store",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/images/ecosystem/file.png",
    tags: ["Php", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Database Adapter](https://github.com/php-casbin/database-adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, Microsoft SQL Server are supported by [techone/database](https://github.com/techoner/database)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Php", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Zend Db Adapter](https://github.com/php-casbin/zend-db-adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, Oracle, IBM DB2, Microsoft SQL Server, Other PDO Driver are supported by [zend-db](https://docs.zendframework.com/zend-db/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Php", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Doctrine DBAL Adapter (Recommend)](https://github.com/php-casbin/dbal-adapter)",
    description:
      "Powerful PHP database abstraction layer ([DBAL](https://github.com/doctrine/dbal)) with many features for database schema introspection and management.",
    image: "/images/ecosystem/DBAL.png",
    tags: ["Php", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Medoo Adapter](https://github.com/php-casbin/medoo-adapter)",
    description:
      "[Medoo](https://github.com/catfan/Medoo) is a lightweight PHP Database Framework to Accelerate Development, supports all SQL databases, including `MySQL`, `MSSQL`, `SQLite`, `MariaDB`, `PostgreSQL`, `Sybase`, `Oracle` and more.",
    image: "/images/ecosystem/SQL.png",
    tags: ["Php", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Laminas-db Adapter](https://github.com/php-casbin/laminas-db-adapter)",
    description:
      "MySQL, PostgreSQL, Oracle, IBM DB2, Microsoft SQL Server, PDO, etc. are supported by [laminas-db](https://github.com/laminas/laminas-db)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Php", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Zend-db Adapter](https://github.com/php-casbin/zend-db-adapter)",
    description:
      "MySQL, PostgreSQL, Oracle, IBM DB2, Microsoft SQL Server, PDO, etc. are supported by [zend-db](https://github.com/zendframework/zend-db)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Php", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[ThinkORM Adapter (ThinkPHP)](https://github.com/getandpost/tp3-adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, Oracle, Microsoft SQL Server, MongoDB are supported by [ThinkORM](https://github.com/top-think/think-orm)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Php", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Redis Adapter](https://github.com/nsnake/CasbinAdapter-Redis-Adapter)",
    description: "For [Redis](https://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Php", "Adapter"],
    type: "KV store",
    autoSave: "❌",
    author: "[@nsnake](https://github.com/nsnake)",
  },
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/images/ecosystem/file.png",
    tags: [".NET", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[EF Adapter](https://github.com/casbin-net/EF-Adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, Microsoft SQL Server, Oracle, DB2, etc. are supported by [Entity Framework 6](https://docs.microsoft.com/en-us/ef/ef6/)",
    image: "/images/ecosystem/SQL.png",
    tags: [".NET", "Adapter"],
    type: "ORM",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[EFCore Adapter](https://github.com/casbin-net/EFCore-Adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, Microsoft SQL Server, Oracle, DB2, etc. are supported by [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)",
    image: "/images/ecosystem/SQL.png",
    tags: [".NET", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Linq2DB Adapter](https://github.com/Tirael/Linq2DB-Adapter)",
    description:
      "[MySQL, PostgreSQL, SQLite, Microsoft SQL Server, Oracle, Access, Firebird, Sybase, etc.](https://github.com/linq2db/linq2db/blob/master/Tests/Base/TestProvName.cs) are supported by [linq2db](https://github.com/linq2db/linq2db)",
    image: "/images/ecosystem/SQL.png",
    tags: [".NET", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@Tirael](https://github.com/Tirael)",
  },
  {
    title: "[Azure Cosmos DB Adapter](https://github.com/sagarkhandelwal/Casbin-Using-Cosmos)",
    description:
      "For [Microsoft Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction)",
    image: "/images/ecosystem/cosmosDB.png",
    tags: [".NET", "Adapter"],
    type: "Cloud",
    autoSave: "✅",
    author: "[@sagarkhandelwal](https://github.com/sagarkhandelwal)",
  },
  {
    title: "[Redis Adapter](https://github.com/casbin-net/redis-adapter)",
    description: "For [Redis](https://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: [".NET", "Adapter"],
    type: "KV store",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[SqlSugar Adapter](https://github.com/SharpFort/sqlsugar-adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, Microsoft SQL Server, Oracle, etc. are supported by [SqlSugar](https://github.com/donet5/SqlSugar)",
    image: "/images/ecosystem/SQL.png",
    tags: [".NET", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@SharpFort](https://github.com/SharpFort)",
  },
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/images/ecosystem/file.png",
    tags: ["Rust", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Diesel Adapter](https://github.com/casbin-rs/diesel-adapter)",
    description:
      "[SQLite, PostgreSQL, MySQL](https://github.com/diesel-rs/diesel/blob/master/guide_drafts/backend_installation.md) are supported by [Diesel](http://diesel.rs/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Rust", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[Sqlx Adapter](https://github.com/casbin-rs/sqlx-adapter)",
    description:
      "PostgreSQL, MySQL are supported by [Sqlx](https://github.com/launchbadge/sqlx) with fully asynchronous operation",
    image: "/images/ecosystem/SQL.png",
    tags: ["Rust", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[SeaORM Adapter](https://github.com/lingdu1234/sea_orm_casbin_adapter)",
    description:
      "PostgreSQL, MySQL, SQLite are supported by [SeaORM](https://github.com/SeaQL/sea-orm) with fully asynchronous operation",
    image: "/images/ecosystem/SQL.png",
    tags: ["Rust", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@lingdu1234](https://github.com/lingdu1234)",
  },
  {
    title: "[SeaORM Adapter](https://github.com/ZihanType/sea-orm-adapter)",
    description:
      "PostgreSQL, MySQL, SQLite are supported by [SeaORM](https://github.com/SeaQL/sea-orm) with fully asynchronous operation",
    image: "/images/ecosystem/SQL.png",
    tags: ["Rust", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@ZihanType](https://github.com/ZihanType)",
  },
  {
    title: "[Rbatis Adapter](https://github.com/jiashiwen/casbin-rbatis-adapter)",
    description:
      "MySQL, PostgreSQL, SQLite, SQL Server, MariaDB, TiDB, CockroachDB, Oracle are supported by [Rbatis](https://github.com/rbatis/rbatis)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Rust", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[rbatis](https://github.com/rbatis)",
  },
  {
    title: "[DynamodDB Adapter](https://github.com/fospitia/dynamodb-adapter)",
    description: "For [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)",
    image: "/images/ecosystem/dynamoDB.png",
    tags: ["Rust", "Adapter"],
    type: "NoSQL",
    autoSave: "✅",
    author: "[@fospitia](https://github.com/fospitia)",
  },
  {
    title: "[MongoDB Adapter](https://github.com/wangjun861205/nb-mongo-adapter)",
    description: "For [MongoDB](https://www.mongodb.com)",
    image: "/images/ecosystem/monogoDB.png",
    tags: ["Rust", "Adapter"],
    type: "MongoDB",
    autoSave: "✅",
    author: "[@wangjun861205](https://github.com/wangjun861205)",
  },
  {
    title: "[JSON Adapter](http://github.com/casbin-rs/json-adapter)",
    description: "For [JSON](https://json.org/)",
    image: "/images/ecosystem/json.png",
    tags: ["Rust", "Adapter"],
    type: "String",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[YAML Adapter](https://github.com/casbin-rs/yaml-adapter)",
    description: "For [YAML](https://yaml.org/)",
    image: "/images/ecosystem/yaml.png",
    tags: ["Rust", "Adapter"],
    type: "String",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[String Adapter](https://github.com/casbin-rs/string-adapter)",
    description: "For [String](https://doc.rust-lang.org/std/string/struct.String.html)",
    image: "/images/ecosystem/string.png",
    tags: ["Rust", "Adapter"],
    type: "String",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/images/ecosystem/file.png",
    tags: ["Ruby", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Sequel Adapter](https://github.com/CasbinRuby/casbin-ruby-sql-adapter)",
    description:
      "[ADO, Amalgalite, IBM_DB, JDBC, MySQL, Mysql2, ODBC, Oracle, PostgreSQL, SQLAnywhere, SQLite3, and TinyTDS](http://sequel.jeremyevans.net/) are supported by [Sequel](http://sequel.jeremyevans.net/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Ruby", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[CasbinRuby](https://github.com/CasbinRuby)",
  },
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/images/ecosystem/file.png",
    tags: ["Swift", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title:
      "[Memory Adapter (built-in)](https://github.com/casbin/SwiftCasbin/blob/master/Sources/Casbin/Adapter/MemoryAdapter.swift)",
    description: "For memory",
    image: "/images/ecosystem/memory.png",
    tags: ["Swift", "Adapter"],
    type: "Memory",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Fluent Adapter](https://github.com/SwiftCasbin/fluent-adapter)",
    description:
      "[PostgreSQL, SQLite, MySQL, MongoDB](https://docs.vapor.codes/4.0/fluent/overview/#drivers) are supported by [Fluent](https://github.com/vapor/fluent)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Swift", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/images/ecosystem/file.png",
    tags: ["Lua", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[Filtered File Adapter (built-in)](/docs/policy-subset-loading)",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files with policy subset loading support",
    image: "/images/ecosystem/file.png",
    tags: ["Lua", "Adapter"],
    type: "File",
    autoSave: "❌",
    author: "Casbin",
  },
  {
    title: "[LuaSQL Adapter](https://github.com/casbin-lua/luasql-adapter)",
    description:
      "MySQL, PostgreSQL, SQLite3 are supported by [LuaSQL](http://lunarmodules.github.io/luasql/)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Lua", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[4DaysORM Adapter](https://github.com/casbin-lua/4daysorm-adapter)",
    description: "MySQL, SQLite3 are supported by [4DaysORM](https://github.com/itdxer/4DaysORM)",
    image: "/images/ecosystem/SQL.png",
    tags: ["Lua", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "Casbin",
  },
  {
    title: "[OpenResty Adapter](https://github.com/tom2nonames/lua-resty-casbin-adapter)",
    description: "MySQL, PostgreSQL are supported by it",
    image: "/images/ecosystem/SQL.png",
    tags: ["Lua", "Adapter"],
    type: "ORM",
    autoSave: "✅",
    author: "[@tom2nonames](https://github.com/tom2nonames)",
  },
  {
    title: "[Gin](https://github.com/gin-gonic/gin)",
    description:
      "A HTTP web framework featuring a Martini-like API with much better performance, via plugin: [authz](https://github.com/gin-contrib/authz) or [gin-casbin](https://github.com/maxwellhertz/gin-casbin)",
    image: "/images/ecosystem/gin.jpeg",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Beego](https://github.com/beego/beego)",
    description:
      "An open-source, high-performance web framework for Go, via built-in plugin: [plugins/authz](https://github.com/astaxie/beego/blob/master/plugins/authz)",
    image: "/images/ecosystem/beego.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Caddy](https://github.com/caddyserver/caddy)",
    description:
      "Fast, cross-platform HTTP/2 web server with automatic HTTPS, via plugin: [caddy-authz](https://github.com/casbin/caddy-authz)",
    image: "/images/ecosystem/caddy.jpeg",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Traefik](https://github.com/traefik/traefik)",
    description:
      "The cloud native application proxy, via plugin: [casbin-forward-auth](https://github.com/grepplabs/casbin-forward-auth) or [traefik-auth-plugin](https://github.com/Knight-7/auth-plugin)",
    image: "/images/ecosystem/traefik.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Kratos](https://github.com/go-kratos/kratos)",
    description:
      "Your ultimate Go microservices framework for the cloud-native era, via plugin: [tx7do/kratos-casbin](https://github.com/tx7do/kratos-casbin) or [overstarry/kratos-casbin](https://github.com/overstarry/kratos-casbin)",
    image: "/images/ecosystem/kratos.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Go kit](https://github.com/go-kit/kit)",
    description:
      "A toolkit for microservices, via built-in plugin: [plugins/authz](https://github.com/go-kit/kit/tree/master/auth/casbin)",
    image: "/images/ecosystem/gokit.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Fiber](https://github.com/gofiber/fiber)",
    description:
      "An Express inspired web framework written in Go, via middleware: [casbin in gofiber/contrib](https://github.com/gofiber/contrib/tree/main/casbin) or [fiber-casbinrest](https://github.com/prongbang/fiber-casbinrest) or [fiber-boilerplate](https://github.com/sujit-baniya/fiber-boilerplate) or [gofiber-casbin](https://github.com/pcminh0505/gofiber-casbin)",
    image: "/images/ecosystem/fiber.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[FastHTTP](https://github.com/valyala/fasthttp)",
    description:
      "Fast HTTP package for Go. Tuned for high performance. Zero memory allocations in hot paths. Up to 10x faster than net/http, via plugin: [fasthttp-auth](https://github.com/casbin/fasthttp-auth)",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Revel](https://github.com/revel/revel)",
    description:
      "A high productivity, full-stack web framework for the Go language, via plugin: [auth/casbin](https://github.com/revel/modules/tree/master/auth/casbin)",
    image: "/images/ecosystem/revel.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Echo](https://github.com/labstack/echo)",
    description:
      "High performance, minimalist Go web framework, via plugin: [echo-authz](https://github.com/labstack/echo-contrib/tree/master/casbin) or [echo-casbin](https://github.com/alexferl/echo-casbin) or [casbinrest](https://github.com/prongbang/casbinrest) or [echo-boilerplate](https://github.com/alexferl/echo-boilerplate)",
    image: "/images/ecosystem/echo.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Iris](https://github.com/kataras/iris)",
    description:
      "The fastest web framework for Go in (THIS) Earth. HTTP/2 Ready-To-GO, via plugin: [casbin](https://github.com/iris-contrib/middleware/tree/master/casbin) or [iris-middleware-casbin](https://github.com/kokobing/iris-middleware-casbin)",
    image: "/images/ecosystem/iris.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[GoFrame](https://github.com/gogf/gf)",
    description:
      "A modular, powerful, high-performance and enterprise-class application development framework of Golang, via plugin: [gf-casbin](https://github.com/dobyte/gf-casbin)",
    image: "/images/ecosystem/goframe.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[go-zero](https://github.com/zeromicro/go-zero)",
    description:
      "A cloud-native Go microservices framework with cli tool for productivity, via plugin: [casbin in zero-contrib](https://github.com/zeromicro/zero-contrib/tree/main/auth/casbin)",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Negroni](https://github.com/urfave/negroni)",
    description:
      "Idiomatic HTTP Middleware for Golang, via plugin: [negroni-authz](https://github.com/casbin/negroni-authz)",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Chi](https://github.com/pressly/chi)",
    description:
      "A lightweight, idiomatic and composable router for building HTTP services, via plugin: [chi-authz](https://github.com/casbin/chi-authz)",
    image: "/images/ecosystem/chi.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Buffalo](https://github.com/gobuffalo/buffalo)",
    description:
      "A Go web development eco-system, designed to make your life easier, via plugin: [buffalo-mw-rbac](https://github.com/kgosse/buffalo-mw-rbac)",
    image: "/images/ecosystem/buffalo.jpeg",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Macaron](https://github.com/go-macaron/macaron)",
    description:
      "A high productive and modular web framework in Go, via plugin: [authz](https://github.com/go-macaron/authz)",
    image: "/images/ecosystem/macaron.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[DotWeb](https://github.com/devfeel/dotweb)",
    description:
      "Simple and easy go web micro framework, via plugin: [authz](https://github.com/devfeel/middleware/tree/master/authz)",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Tango](https://github.com/lunny/tango)",
    description:
      "Micro & pluggable web framework for Go, via plugin: [authz](https://gitea.com/tango/authz)",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Baa](https://github.com/go-baa/baa)",
    description:
      "An express Go web framework with routing, middleware, dependency injection and http context, via plugin: [authz](https://github.com/baa-middleware/authz)",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Tyk](https://github.com/TykTechnologies/tyk)",
    description:
      "An open source Enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols, via plugin: [tyk-authz](https://github.com/casbin/tyk-authz)",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Hertz](https://github.com/cloudwego/hertz)",
    description:
      "Go HTTP framework with high-performance and strong-extensibility for building micro-services, via plugin: [casbin](https://github.com/hertz-contrib/casbin)",
    image: "/images/ecosystem/hertz.png",
    tags: ["Go", "Middleware"],
  },
  {
    title: "[Shield](https://github.com/odpf/shield)",
    description: "An authZ server and authZ aware reverse-proxy built on top of casbin.",
    image: "/images/ecosystem/express.png",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[Express](https://github.com/expressjs/express)",
    description:
      "Fast, unopinionated, minimalist web framework for node, via plugin: [express-authz](https://github.com/node-casbin/express-authz)",
    image: "/images/ecosystem/express.png",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[Koa](https://github.com/koajs/koa)",
    description:
      "Expressive middleware for node.js using ES2017 async functions, via plugin: [koa-authz](https://github.com/node-casbin/koa-authz) or [koajs-starter](https://github.com/djordjep/koajs-starter) or [koa-casbin](https://github.com/zcong1993/koa-casbin)",
    image: "/images/ecosystem/koa.png",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[LoopBack 4](https://github.com/koajs/koa)",
    description:
      "A highly extensible Node.js and TypeScript framework for building APIs and microservices, via plugin: [loopback4-authorization](https://github.com/sourcefuse/loopback4-authorization)",
    image: "/images/ecosystem/loopback.png",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[Nest](https://nestjs.com/)",
    description:
      "Progressive Node.js framework for building efficient and scalable server-side applications on top of TypeScript & JavaScript. via plugin: [nest-authz](https://github.com/dreamdevil00/nest-authz) or [nest-casbin](https://github.com/pardjs/nest-casbin) or [NestJS Casbin Module](https://github.com/switchit-conseil/nestjs-casbin-module) or [nestjs-casbin](https://github.com/juicycleff/nestjs-casbin) or [acl-nest](https://github.com/Twiddlle/acl-nest) or [nestjs-casbin-typeorm](https://github.com/0xb4lamx/nestjs-casbin-typeorm)",
    image: "/images/ecosystem/nest.png",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[Fastify](https://github.com/fastify/fastify)",
    description:
      "Fast and low overhead web framework, for Node.js. via plugin: [fastify-casbin](https://github.com/nearform/fastify-casbin) or [fastify-casbin-rest](https://github.com/nearform/fastify-casbin-rest)",
    image: "/images/ecosystem/fastify.png",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[Egg](https://github.com/eggjs/egg)",
    description:
      "Born to build better enterprise frameworks and apps with Node.js & Koa, via plugin: [egg-authz](https://github.com/node-casbin/egg-authz) or [egg-zrole](https://github.com/klren0312/egg-zrole)",
    image: "/images/ecosystem/egg.jpeg",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[hapi](https://hapi.dev/)",
    description:
      "The Simple, Secure Framework Developers Trust. via plugin: [hapi-authz](https://github.com/node-casbin/hapi-authz)",
    image: "/images/ecosystem/hapi.png",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[Casbin JWT Express](https://github.com/tiagostutz/casbin-jwt-express)",
    description:
      "Authorization middleware that uses stateless JWT token to validate ACL rules using Casbin",
    image: "/images/ecosystem/jwt.png",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[Hono](https://github.com/honojs/hono) ",
    description:
      "Fast, lightweight, built on Web Standards. via plugin: [@hono/casbin](https://github.com/honojs/middleware/tree/main/packages/casbin)",
    image: "/images/ecosystem/hono.png",
    tags: ["Node.js", "Middleware"],
  },
  {
    title: "[Django](https://www.djangoproject.com/)",
    description:
      "A high-level Python Web framework, via plugin: [django-casbin](https://github.com/officialpycasbin/django-casbin) or [django-casbin-auth](https://github.com/officialpycasbin/django-casbin-auth)",
    image: "/images/ecosystem/django.png",
    tags: ["Python", "Middleware"],
  },
  {
    title: "[Flask](http://flask.pocoo.org/)",
    description:
      "A microframework for Python based on Werkzeug, Jinja 2 and good intentions, via plugin: [flask-authz](https://github.com/officialpycasbin/flask-authz) or [Flask-Casbin (3rd-party, but maybe more friendly)](https://github.com/daymien/Flask-Casbin) or [rbac-flask](https://github.com/daobeng/rbac-flask/tree/flask-casbin)",
    image: "/images/ecosystem/flask.png",
    tags: ["Python", "Middleware"],
  },
  {
    title: "[FastAPI](https://github.com/tiangolo/fastapi)",
    description:
      "A modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints, via plugin: [fastapi-casbin-auth](https://github.com/officialpycasbin/fastapi-casbin-auth) or [Fastapi-app](https://github.com/lqmanh/fastapi-app)",
    image: "/images/ecosystem/fastapi.png",
    tags: ["Python", "Middleware"],
  },
  {
    title: "[OpenStack](https://www.openstack.org/)",
    description:
      "The most widely deployed open source cloud software in the world, via plugin: [openstack-patron](https://github.com/casbin/openstack-patron)",
    image: "/images/ecosystem/openstack.png",
    tags: ["Python", "Middleware"],
  },
  {
    title: "[Tornado](https://www.tornadoweb.org/)",
    description:
      "Tornado is a Python web framework and asynchronous networking library, via plugin: [tornado-authz](https://github.com/officialpycasbin/tornado-authz)",
    image: "/images/ecosystem/tornado.png",
    tags: ["Python", "Middleware"],
  },
  {
    title: "[Spring Boot](https://projects.spring.io/spring-boot/)",
    description:
      "Makes it easy to create Spring-powered applications and services, via plugin: [casbin-spring-boot-starter](https://github.com/jcasbin/casbin-spring-boot-starter) or [Simple SpringBoot security demo with jCasbin](https://github.com/jveverka/spring-examples/tree/master/spring-jcasbin)",
    image: "/images/ecosystem/springboot.png",
    tags: ["Java", "Middleware"],
  },
  {
    title: "[Apache Shiro](https://shiro.apache.org/)",
    description:
      "A powerful and easy-to-use Java security framework that performs authentication, authorization, cryptography, and session management, via plugin: [shiro-casbin](https://github.com/jcasbin/shiro-casbin) or [shiro-jcasbin-spring-boot-starter](https://github.com/mapleafgo/shiro-jcasbin-spring-boot-starter)",
    image: "/images/ecosystem/shiro.jpeg",
    tags: ["Java", "Middleware"],
  },
  {
    title: "[JFinal](http://www.jfinal.com/)",
    description:
      "A simple, light, rapid, independent and extensible Java WEB + ORM framework, via plugin: [jfinal-authz](https://github.com/jcasbin/jfinal-authz)",
    tags: ["Java", "Middleware"],
  },
  {
    title: "[Nutz](https://nutzam.com/)",
    description:
      "Web framework (MVC/IOC/AOP/DAO/JSON) for all Java developers, via plugin: [nutz-authz](https://github.com/jcasbin/nutz-authz)",
    image: "/images/ecosystem/nuzt.png",
    tags: ["Java", "Middleware"],
  },
  {
    title: "[mangoo I/O](https://github.com/svenkubiak/mangooio)",
    description:
      "An intuitive, lightweight, high performance full stack Java web framework, via built-in plugin: [AuthorizationService.java](https://github.com/svenkubiak/mangooio/blob/e8c647a3f7c427bce27377025bec074f6d767f50/mangooio-core/src/main/java/io/mangoo/services/AuthorizationService.java)",
    tags: ["Java", "Middleware"],
  },
  {
    title: "[Laravel](https://laravel.com/)",
    description:
      "The PHP framework for web artisans, via plugin: [laravel-authz](https://github.com/php-casbin/laravel-authz)",
    image: "/images/ecosystem/laravel.png",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[Yii PHP Framework](https://www.yiiframework.com/)",
    description:
      "A fast, secure, and efficient PHP framework, via plugin: [yii-permission](https://github.com/php-casbin/yii-permission) or [yii-casbin](https://github.com/php-casbin/yii-casbin)",
    image: "/images/ecosystem/yii.png",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[CakePHP](https://cakephp.org/)",
    description:
      "Build fast, grow solid PHP Framework, via plugin: [cake-permission](https://github.com/php-casbin/cake-permission)",
    image: "/images/ecosystem/cake.png",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[CodeIgniter](https://codeigniter.com/)",
    description:
      "Associate users with roles and permissions in CodeIgniter4 Web Framework, via plugin: [CodeIgniter Permission](https://github.com/php-casbin/codeigniter-permission)",
    image: "/images/ecosystem/codeIgniter.png",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[ThinkPHP 5.1](https://www.thinkphp.cn/)",
    description:
      "The ThinkPHP 5.1 framework, via plugin: [think-casbin](https://github.com/php-casbin/think-casbin)",
    image: "/images/ecosystem/thinkPHP.png",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[ThinkPHP 6.0](https://www.thinkphp.cn/)",
    description:
      "The ThinkPHP 6.0 framework, via plugin: [think-authz](https://github.com/php-casbin/think-authz)",
    image: "/images/ecosystem/thinkPHP.png",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[Symfony](https://symfony.com/)",
    description:
      "The Symfony PHP framework, via plugin: [symfony-permission](https://github.com/php-casbin/symfony-permission) or [symfony-casbin](https://github.com/videni/symfony-casbin)",
    image: "/images/ecosystem/symfony.png",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[Hyperf](https://github.com/hyperf/hyperf)",
    description:
      "A coroutine framework that focuses on hyperspeed and flexibility, via plugin: [hyperf-permission](https://github.com/php-casbin/hyperf-permission) or [donjan-deng/hyperf-casbin](https://github.com/donjan-deng/hyperf-casbin) or [cblink/hyperf-casbin](https://github.com/cblink/hyperf-casbin)",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[EasySwoole](https://www.easyswoole.com/)",
    description:
      "A distributed, persistent memory PHP framework based on the Swoole extension, via plugin: [easyswoole-permission](https://github.com/php-casbin/easyswoole-permission) or [easyswoole-hyperfOrm-permission](https://github.com/ice-leng/easyswoole-hyperfOrm-permission)",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[Slim](https://www.slimframework.com/)",
    description:
      "A PHP micro framework that helps you quickly write simple yet powerful web applications and APIs, via plugin: [casbin-with-slim](https://github.com/php-casbin/casbin-with-slim)",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[Phalcon](https://phalcon.io/)",
    description:
      "A full-stack PHP framework delivered as a C-extension, via plugin: [phalcon-permission](https://github.com/php-casbin/phalcon-permission)",
    image: "/images/ecosystem/phalcon.png",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[Webman](https://github.com/walkor/webman)",
    description:
      "High performance HTTP Service Framework for PHP based on Workerman, via plugin: [webman-permission](https://github.com/php-casbin/webman-permission) or [webman-casbin](https://github.com/sunsgneayo/webman-casbin)",
    tags: ["Php", "Middleware"],
  },
  {
    title: "[ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core)",
    description:
      "An open-source and cross-platform framework for building modern cloud based internet connected applications, such as web apps, IoT apps and mobile backends, via plugin: [Casbin.AspNetCore](https://github.com/casbin-net/Casbin.AspNetCore)",
    image: "/images/ecosystem/asp.jpeg",
    tags: [".NET", "Middleware"],
  },
  {
    title: "[ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core)",
    description:
      "A simple demo of using Casbin at ASP.NET Core framework, via plugin: [CasbinACL-aspNetCore](https://github.com/MustafaMustafayev/CasbinACL-aspNetCore)",
    image: "/images/ecosystem/asp.jpeg",
    tags: [".NET", "Middleware"],
  },
  {
    title: "[Actix](https://github.com/actix/actix)",
    description:
      "A Rust actors framework, via plugin: [actix-casbin](https://github.com/casbin-rs/actix-casbin)",
    image: "/images/ecosystem/actix.png",
    tags: ["Rust", "Middleware"],
  },
  {
    title: "[Actix web](https://github.com/actix/actix-web)",
    description:
      "A small, pragmatic, and extremely fast rust web framework, via plugin: [actix-casbin-auth](https://github.com/casbin-rs/actix-casbin-auth)",
    image: "/images/ecosystem/actix.png",
    tags: ["Rust", "Middleware"],
  },
  {
    title: "[Rocket](https://github.com/SergioBenitez/Rocket)",
    description:
      "a web framework for Rust that makes it simple to write fast, secure web applications without sacrificing flexibility, usability, or type safety, via plugin: [rocket-authz](https://github.com/casbin-rs/rocket-authz) or [rocket-casbin-auth](https://github.com/0xethsign/rocket-casbin-auth-app)",
    image: "/images/ecosystem/rocket.jpeg",
    tags: ["Rust", "Middleware"],
  },
  {
    title: "[Axum web](https://github.com/tokio-rs/axum)",
    description:
      "A ergonomic and modular rust web framework, via plugin: [axum-casbin-auth](https://github.com/casbin-rs/axum-casbin-auth)",
    tags: ["Rust", "Middleware"],
  },
  {
    title: "[Poem web](https://github.com/poem-web/poem)",
    description:
      "A full-featured and easy to use web framework with the Rust programming language, via plugin: [poem-casbin](https://github.com/casbin-rs/poem-casbin)",
    image: "/images/ecosystem/poem.jpeg",
    tags: ["Rust", "Middleware"],
  },
  {
    title: "[Vapor](https://github.com/vapor/vapor)",
    description:
      "A server-side Swift web framework, via plugin: [vapor-authz](https://github.com/SwiftCasbin/vapor-authz)",
    image: "/images/ecosystem/vapor.png",
    tags: ["Swift", "Middleware"],
  },
  {
    title: "[OpenResty](https://openresty.org/)",
    description:
      "A dynamic web platform based on NGINX and LuaJIT, via plugin: [lua-resty-casbin](https://github.com/casbin-lua/lua-resty-casbin) and [casbin-openresty-example](https://github.com/rushitote/casbin-openresty-example)",
    image: "/images/ecosystem/openResty.png",
    tags: ["Lua", "Middleware"],
  },
  {
    title: "[Kong](https://github.com/Kong/kong)",
    description:
      "A cloud-native, platform-agnostic, scalable API Gateway distinguished for its high performance and extensibility via plugins, via plugin: [kong-authz](https://github.com/casbin-lua/kong-authz)",
    image: "/images/ecosystem/openResty.png",
    tags: ["Lua", "Middleware"],
  },
  {
    title: "[APISIX](https://github.com/apache/apisix)",
    description:
      "A dynamic, real-time, high-performance API gateway, via plugin: [authz-casbin](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/authz-casbin.md)",
    image: "/images/ecosystem/apisix.png",
    tags: ["Lua", "Middleware"],
  },
  {
    title: "[Nginx](https://nginx.org/)",
    description:
      "A HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, via plugin: [nginx-casbin-module](https://github.com/casbin-cpp/nginx-casbin-module)",
    image: "/images/ecosystem/nginx.png",
    tags: ["C++", "Middleware"],
  },
  {
    title: "[PostgreSQL WatcherEx](https://github.com/IguteChung/casbin-psql-watcher)",
    description: "WatcherEx for [PostgreSQL](https://www.postgresql.org/)",
    image: "/images/ecosystem/postgreSQL.png",
    tags: ["Go", "Watcher"],
    type: "Database",
    author: "[@IguteChung](https://github.com/IguteChung)",
  },
  {
    title: "[Redis WatcherEx](https://github.com/casbin/redis-watcher)",
    description: "WatcherEx for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Go", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[Redis Watcher](https://github.com/billcobbler/casbin-redis-watcher)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Go", "Watcher"],
    type: "KV store",
    author: "[@billcobbler](https://github.com/billcobbler)",
  },
  {
    title: "[Etcd Watcher](https://github.com/casbin/etcd-watcher)",
    description: "Watcher for [etcd](https://github.com/coreos/etcd)",
    image: "/images/ecosystem/etcd.png",
    tags: ["Go", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[TiKV Watcher](https://github.com/casbin/tikv-watcher)",
    description: "Watcher for [TiKV](https://github.com/tikv/tikv)",
    image: "/images/ecosystem/tikv.png",
    tags: ["Go", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[Kafka Watcher](https://github.com/wgarunap/casbin-kafka-watcher)",
    description: "Watcher for [Apache Kafka](https://kafka.apache.org/)",
    image: "/images/ecosystem/kafka.png",
    tags: ["Go", "Watcher"],
    type: "Messaging system",
    author: "[@wgarunap](https://github.com/wgarunap)",
  },
  {
    title: "[NATS Watcher](https://github.com/Soluto/casbin-nats-watcher)",
    description: "Watcher for [NATS](https://nats.io/)",
    tags: ["Go", "Watcher"],
    type: "Messaging system",
    author: "[Soluto](https://github.com/Soluto)",
  },
  {
    title: "[ZooKeeper Watcher](https://github.com/grepsr/casbin-zk-watcher)",
    description: "Watcher for [Apache ZooKeeper](https://zookeeper.apache.org/)",
    image: "/images/ecosystem/zookeeper.png",
    tags: ["Go", "Watcher"],
    type: "Messaging system",
    author: "[Grepsr](https://github.com/grepsr)",
  },
  {
    title:
      "[NATS, RabbitMQ, GCP Pub/Sub, AWS SNS & SQS, Kafka, InMemory](https://github.com/rusenask/casbin-go-cloud-watcher)",
    description:
      "Watcher based on [Go Cloud Dev Kit](https://gocloud.dev/) that works with leading cloud providers and self-hosted infrastructure",
    tags: ["Go", "Watcher"],
    type: "Messaging System",
    author: "[@rusenask](https://github.com/rusenask/)",
  },
  {
    title:
      "[NATS, RabbitMQ, GCP Pub/Sub, AWS SNS & SQS, Kafka, InMemory](https://github.com/bartventer/casbin-go-cloud-watcher)",
    description:
      "WatcherEx based on [Go Cloud Dev Kit](https://gocloud.dev/) that works with leading cloud providers and self-hosted infrastructure",
    tags: ["Go", "Watcher"],
    type: "Messaging System",
    author: "[@bartventer](https://github.com/bartventer/)",
  },
  {
    title: "[RocketMQ Watcher](https://github.com/fmyxyz/casbin-rocketmq-watcher)",
    description: "Watcher for [Apache RocketMQ](https://rocketmq.apache.org/)",
    image: "/images/ecosystem/rocketMQ.png",
    tags: ["Go", "Watcher"],
    type: "Messaging system",
    author: "[@fmyxyz](https://github.com/fmyxyz)",
  },
  {
    title: "[Etcd Watcher](https://github.com/node-casbin/etcd-watcher)",
    description: "Watcher for [etcd](https://github.com/coreos/etcd)",
    image: "/images/ecosystem/etcd.png",
    tags: ["Node.js", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[Redis Watcher](https://github.com/node-casbin/redis-watcher)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Node.js", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[Pub/Sub Watcher](https://github.com/node-casbin/pubsub-watcher)",
    description: "Watcher for [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/docs)",
    image: "/images/ecosystem/pubsub.png",
    tags: ["Node.js", "Watcher"],
    type: "Messaging system",
    author: "Casbin",
  },
  {
    title:
      "[MongoDB Change Streams Watcher](https://github.com/node-casbin/mongo-changestream-watcher)",
    description:
      "Watcher for [MongoDB Change Streams](https://www.mongodb.com/docs/manual/changeStreams/)",
    image: "/images/ecosystem/monogoDB.png",
    tags: ["Node.js", "Watcher"],
    type: "Database",
    author: "Casbin",
  },
  {
    title: "[Postgres Watcher](https://github.com/mcollina/casbin-pg-watcher)",
    description: "Watcher for [PostgreSQL](https://www.postgresql.org/)",
    image: "/images/ecosystem/postgreSQL.png",
    tags: ["Node.js", "Watcher"],
    type: "Database",
    author: "[@mcollina](https://github.com/mcollina)",
  },
  {
    title: "[Etcd Watcher](https://github.com/officialpycasbin/etcd-watcher)",
    description: "Watcher for [etcd](https://github.com/coreos/etcd)",
    image: "/images/ecosystem/etcd.png",
    tags: ["Python", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[Redis Watcher](https://github.com/officialpycasbin/redis-watcher)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Python", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[Redis Watcher](https://github.com/ScienceLogic/flask-casbin-redis-watcher)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Python", "Watcher"],
    type: "KV store",
    author: "[ScienceLogic](https://github.com/ScienceLogic)",
  },
  {
    title: "[Redis Async Watcher](https://github.com/kevinkelin/casbin_async_redis_watcher)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Python", "Watcher"],
    type: "KV store",
    author: "[@kevinkelin](https://github.com/kevinkelin)",
  },
  {
    title: "[PostgreSQL Watcher](https://github.com/officialpycasbin/postgresql-watcher)",
    description: "Watcher for [PostgreSQL](https://www.postgresql.org/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Python", "Watcher"],
    type: "Database",
    author: "Casbin",
  },
  {
    title: "[RabbitMQ Watcher](https://github.com/officialpycasbin/rabbitmq-watcher)",
    description: "Watcher for [RabbitMQ](https://www.rabbitmq.com/)",
    image: "/images/ecosystem/rabbitMQ.png",
    tags: ["Python", "Watcher"],
    type: "Messaging system",
    author: "Casbin",
  },
  {
    title: "[MongoDB Watcher](https://github.com/sanguinedab/pycasbin-mongo-watcher)",
    description: "Watcher for [MongoDB](https://www.mongodb.com/)",
    image: "/images/ecosystem/monogoDB.png",
    tags: ["Python", "Watcher"],
    type: "Database",
    author: "[@sanguinedab](https://github.com/sanguinedab)",
  },
  {
    title: "[Etcd Adapter](https://github.com/mapleafgo/jcasbin-extra)",
    description: "Watcher for [etcd](https://github.com/coreos/etcd)",
    image: "/images/ecosystem/etcd.png",
    tags: ["Java", "Watcher"],
    type: "KV store",
    author: "[@mapleafgo](https://github.com/mapleafgo)",
  },
  {
    title: "[Redis Watcher](https://github.com/jcasbin/redis-watcher)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Java", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[Redis WatcherEx](https://github.com/jcasbin/redis-watcher-ex)",
    description: "WatcherEx for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Java", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[Lettuce-Based Redis Watcher](https://github.com/jcasbin/lettuce-redis-watcher)",
    description: "Watcher for [Redis](http://redis.io/) based on [Lettuce](https://lettuce.io/))",
    image: "/images/ecosystem/lettuce.png",
    tags: ["Java", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[PostgreSQL Watcher](https://github.com/jcasbin/jcasbin-postgres-watcher)",
    description: "Watcher for [PostgreSQL](https://www.postgresql.org/)",
    image: "/images/ecosystem/postgreSQL.png",
    tags: ["Java", "Watcher"],
    type: "Database",
    author: "Casbin",
  },
  {
    title: "[Kafka Watcher](https://github.com/jcasbin/kafka-watcher)",
    description: "Watcher for [Apache Kafka](https://kafka.apache.org/)",
    image: "/images/ecosystem/kafka.png",
    tags: ["Java", "Watcher"],
    type: "Messaging system",
    author: "Casbin",
  },
  {
    title: "[ZooKeeper Watcher](https://github.com/jcasbin/zookeeper-watcher)",
    description: "Watcher for [Apache ZooKeeper](https://zookeeper.apache.org/)",
    image: "/images/ecosystem/zookeeper.png",
    tags: ["Java", "Watcher"],
    type: "Messaging system",
    author: "Casbin",
  },
  {
    title: "[RabbitMQ Watcher](https://github.com/jcasbin/jcasbin-rabbitmq-watcher)",
    description: "Watcher for [RabbitMQ](https://www.rabbitmq.com/)",
    image: "/images/ecosystem/rabbitMQ.png",
    tags: ["Java", "Watcher"],
    type: "Messaging system",
    author: "Casbin",
  },
  {
    title: "[Redis Watcher](https://github.com/php-casbin/webman-permission)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Php", "Watcher"],
    type: "KV store",
    author: "[@Tinywan](https://github.com/Tinywan)",
  },
  {
    title: "[Redis Watcher](https://github.com/Sbou/Casbin.NET-Redis-Watcher)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: [".NET", "Watcher"],
    type: "KV store",
    author: "[@Sbou](https://github.com/Sbou)",
  },
  {
    title: "[Redis Watcher](https://github.com/casbin-rs/redis-watcher)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Rust", "Watcher"],
    type: "KV store",
    author: "Casbin",
  },
  {
    title: "[Redis Watcher](https://github.com/CasbinRuby/casbin-ruby-redis-watcher)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/images/ecosystem/redis.png",
    tags: ["Ruby", "Watcher"],
    type: "KV store",
    author: "[CasbinRuby](https://github.com/CasbinRuby)",
  },
  {
    title: "[RabbitMQ Watcher](https://github.com/CasbinRuby/casbin-ruby-rabbitmq-watcher)",
    description: "Watcher for [RabbitMQ](https://www.rabbitmq.com/)",
    image: "/images/ecosystem/rabbitMQ.png",
    tags: ["Ruby", "Watcher"],
    type: "Messaging system",
    author: "[CasbinRuby](https://github.com/CasbinRuby)",
  },
  {
    title:
      "[Default Role Manager (built-in)](https://github.com/casbin/casbin/blob/master/rbac/default-role-manager/role_manager.go)",
    description: "Supports role hierarchy stored in the Casbin policy",
    tags: ["Go", "RoleManager"],
    author: "Casbin",
  },
  {
    title: "[Session Role Manager](https://github.com/casbin/session-role-manager)",
    description:
      "Supports role hierarchy stored in the Casbin policy, with time-range-based sessions",
    image: "/images/ecosystem/session.png",
    tags: ["Go", "RoleManager"],
    author: "[EDOMO Systems](https://github.com/edomosystems)",
  },
  {
    title: "[Okta Role Manager](https://github.com/casbin/okta-role-manager)",
    description: "Supports role hierarchy stored in [Okta](https://www.okta.com/)",
    image: "/images/ecosystem/okta.png",
    tags: ["Go", "RoleManager"],
    author: "Casbin",
  },
  {
    title: "[Auth0 Role Manager](https://github.com/casbin/auth0-role-manager)",
    description:
      "Supports role hierarchy stored in [Auth0](https://auth0.com/)'s [Authorization Extension](https://auth0.com/docs/extensions/authorization-extension/v2)",
    image: "/images/ecosystem/auth0.png",
    tags: ["Go", "RoleManager"],
    author: "Casbin",
  },
  {
    title:
      "[Default Role Manager (built-in)](https://github.com/casbin/node-casbin/blob/master/src/rbac/defaultRoleManager.ts)",
    description: "Supports role hierarchy stored in the Casbin policy",
    tags: ["Node.js", "RoleManager"],
    author: "Casbin",
  },
  {
    title: "[Session Role Manager](https://github.com/node-casbin/session-role-manager)",
    description:
      "Supports role hierarchy stored in the Casbin policy, with time-range-based sessions",
    image: "/images/ecosystem/session.png",
    tags: ["Node.js", "RoleManager"],
    author: "Casbin",
  },
  {
    title:
      "[Default Role Manager (built-in)](https://github.com/casbin/pycasbin/blob/master/casbin/rbac/default_role_manager/role_manager.py)",
    description: "Supports role hierarchy stored in the Casbin policy",
    tags: ["Python", "RoleManager"],
    author: "Casbin",
  },
  {
    title:
      "[Default Role Manager (built-in)](https://github.com/casbin/jcasbin/blob/master/src/main/java/org/casbin/jcasbin/rbac/DefaultRoleManager.java)",
    description: "Supports role hierarchy stored in the Casbin policy",
    tags: ["Java", "RoleManager"],
    author: "Casbin",
  },
  {
    title:
      "[Default Role Manager (built-in)](https://github.com/php-casbin/php-casbin/blob/master/src/Rbac/DefaultRoleManager/RoleManager.php)",
    description: "Supports role hierarchy stored in the Casbin policy",
    tags: ["Php", "RoleManager"],
    author: "Casbin",
  },
  {
    title: "[Hashicorp Raft Dispatcher](https://github.com/casbin/hraft-dispatcher)",
    description: "A dispatcher based on [Hashicorp Raft](https://github.com/hashicorp/raft)",
    image: "/images/ecosystem/hashicorp.png",
    tags: ["Go", "Dispatcher"],
    type: "Raft",
    author: "Casbin",
  },
  {
    title: "[KDKYG/casbin-dispatcher](https://github.com/KDKYG/casbin-dispatcher)",
    description: "A dispatcher based on [Hashicorp Raft](https://github.com/hashicorp/raft)",
    tags: ["Go", "Dispatcher"],
    type: "Raft",
    author: "[@KDKYG](https://github.com/KDKYG)",
  },
];

export default allPlugins;
