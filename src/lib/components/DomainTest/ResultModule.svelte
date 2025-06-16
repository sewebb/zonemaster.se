<script lang="ts">
  import type {ResultDataResult, ResultLevel} from "@/lib/client.ts";
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import niceName from "@/lib/niceName.ts";
  import Badge from "@/lib/components/Badge/Badge.svelte";
  import ResultGroup from "@/lib/components/DomainTest/ResultGroup.svelte";
  import {expandedModules, toggleModule} from "@/lib/components/DomainTest/store.svelte.ts";
<<<<<<< HEAD
  import { resultIcon } from '@/lib/resultIcon.ts';
=======
>>>>>>> 6ff2543 (add new code base)

    type Props = {
        data: Module;
        summary: ModuleBadge[];
        descriptions: Record<string, string>;
    };

    const { data, descriptions, summary }: Props = $props();
    const module = data.name;
    let open: boolean = $derived(expandedModules[module] || false);
</script>

      {#each summary as { level, count }, i}
<<<<<<< HEAD
        <Badge level={level} round>
            <i class="bi bi-{resultIcon(level)}"></i>
            {count}
        </Badge>
=======
        <Badge level={level} round>{count}</Badge>
>>>>>>> 6ff2543 (add new code base)
      {/each}
    </button>
  </h3>
  {#if open}
  <div class="zm-result__module__data" id={`zmModule-${module}-content`}>
    <Stack vertical gap="s">
      {#each Object.entries(grouped) as [testcase, results]}
        <ResultGroup testcase={testcase} results={results} descriptions={descriptions} />
      {/each}
    </Stack>
  </div>
  {/if}
</section>
